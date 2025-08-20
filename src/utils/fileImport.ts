import { toast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

export interface ImportedRow {
  [key: string]: string | number;
}

export interface ImportResult {
  data: ImportedRow[];
  headers: string[];
  totalRows: number;
  errors: string[];
}

export interface ImportOptions {
  maxFileSize?: number; // in MB, default 10MB
  allowedExtensions?: string[];
  requiredHeaders?: string[];
  skipEmptyRows?: boolean;
}

const DEFAULT_OPTIONS: ImportOptions = {
  maxFileSize: 10,
  allowedExtensions: ['.csv', '.xlsx', '.xls'],
  requiredHeaders: [],
  skipEmptyRows: true,
};

/**
 * Validate file before processing
 */
export const validateFile = (file: File, options: ImportOptions = {}): string[] => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const errors: string[] = [];

  // Check file size
  const maxSize = (opts.maxFileSize || 10) * 1024 * 1024; // Convert MB to bytes
  if (file.size > maxSize) {
    errors.push(`File quá lớn. Tối đa ${opts.maxFileSize}MB`);
  }

  // Check file extension
  const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (opts.allowedExtensions && !opts.allowedExtensions.includes(extension)) {
    errors.push(`File không được hỗ trợ. Chỉ chấp nhận: ${opts.allowedExtensions.join(', ')}`);
  }

  return errors;
};

/**
 * Parse CSV content to JSON
 */
export const parseCSV = (csvText: string, options: ImportOptions = {}): ImportResult => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const lines = csvText.split('\n');
  const result: ImportResult = {
    data: [],
    headers: [],
    totalRows: 0,
    errors: [],
  };

  if (lines.length === 0) {
    result.errors.push('File CSV trống');
    return result;
  }

  // Parse headers
  const headerLine = lines[0].trim();
  if (!headerLine) {
    result.errors.push('Không tìm thấy header');
    return result;
  }

  result.headers = headerLine.split(',').map(h => h.trim().replace(/"/g, ''));

  // Validate required headers
  if (opts.requiredHeaders && opts.requiredHeaders.length > 0) {
    const missingHeaders = opts.requiredHeaders.filter(
      required => !result.headers.some(h => h.toLowerCase() === required.toLowerCase())
    );
    if (missingHeaders.length > 0) {
      result.errors.push(`Thiếu các cột bắt buộc: ${missingHeaders.join(', ')}`);
      return result;
    }
  }

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line && opts.skipEmptyRows) continue;
    if (!line) {
      result.errors.push(`Dòng ${i + 1} trống`);
      continue;
    }

    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    
    if (values.length !== result.headers.length) {
      result.errors.push(`Dòng ${i + 1}: Số cột không khớp (${values.length}/${result.headers.length})`);
      continue;
    }

    const row: ImportedRow = {};
    result.headers.forEach((header, index) => {
      const value = values[index];
      // Try to convert to number if possible
      row[header] = isNaN(Number(value)) ? value : Number(value);
    });

    result.data.push(row);
  }

  result.totalRows = result.data.length;
  return result;
};

/**
 * Read file content as text (for CSV)
 */
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Không thể đọc file'));
      }
    };
    reader.onerror = () => reject(new Error('Lỗi đọc file'));
    reader.readAsText(file, 'UTF-8');
  });
};

/**
 * Read Excel file as ArrayBuffer
 */
export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        resolve(result);
      } else {
        reject(new Error('Không thể đọc file Excel'));
      }
    };
    reader.onerror = () => reject(new Error('Lỗi đọc file Excel'));
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Helper function to process worksheet data
 */
const processWorksheet = (worksheet: XLSX.WorkSheet, opts: ImportOptions, result: ImportResult): ImportResult => {
  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  if (jsonData.length === 0) {
    result.errors.push('Sheet Excel trống');
    return result;
  }

  // Get headers from first row
  const headerRow = jsonData[0] as any[];
  if (!headerRow || headerRow.length === 0) {
    result.errors.push('Không tìm thấy header trong Excel');
    return result;
  }

  result.headers = headerRow.map(h => String(h || '').trim());

  // Validate required headers
  if (opts.requiredHeaders && opts.requiredHeaders.length > 0) {
    const missingHeaders = opts.requiredHeaders.filter(
      required => !result.headers.some(h => h.toLowerCase() === required.toLowerCase())
    );
    if (missingHeaders.length > 0) {
      result.errors.push(`Thiếu các cột bắt buộc: ${missingHeaders.join(', ')}`);
      return result;
    }
  }

  // Parse data rows
  for (let i = 1; i < jsonData.length; i++) {
    const rowData = jsonData[i] as any[];
    
    // Skip empty rows if option is set
    if (opts.skipEmptyRows && (!rowData || rowData.every(cell => !cell && cell !== 0))) {
      continue;
    }

    if (!rowData) {
      result.errors.push(`Dòng ${i + 1} trống`);
      continue;
    }

    const row: ImportedRow = {};
    result.headers.forEach((header, index) => {
      const value = rowData[index];
      // Handle different data types from Excel
      if (value === null || value === undefined) {
        row[header] = '';
      } else if (typeof value === 'number') {
        row[header] = value;
      } else if (typeof value === 'string') {
        row[header] = value.trim();
      } else {
        row[header] = String(value);
      }
    });

    result.data.push(row);
  }

  result.totalRows = result.data.length;
  return result;
};

/**
 * Parse Excel content to JSON
 */
export const parseExcel = (arrayBuffer: ArrayBuffer, options: ImportOptions = {}): ImportResult => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const result: ImportResult = {
    data: [],
    headers: [],
    totalRows: 0,
    errors: [],
  };

  try {
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Target sheet name
    const targetSheetName = 'RNW Combat Stats Dashboard';
    
    // Check if target sheet exists
    if (!workbook.SheetNames.includes(targetSheetName)) {
      // If target sheet doesn't exist, list available sheets and use first one
      const availableSheets = workbook.SheetNames.join(', ');
      result.errors.push(`Không tìm thấy sheet '${targetSheetName}'. Các sheet có sẵn: ${availableSheets}`);
      
      // Fallback to first sheet if target sheet not found
      const fallbackSheetName = workbook.SheetNames[0];
      if (!fallbackSheetName) {
        result.errors.push('File Excel không có sheet nào');
        return result;
      }
      
      // Use first sheet as fallback and add warning
      result.errors.push(`Đang sử dụng sheet '${fallbackSheetName}' thay thế`);
      const worksheet = workbook.Sheets[fallbackSheetName];
      return processWorksheet(worksheet, opts, result);
    }

    // Use target sheet
    const worksheet = workbook.Sheets[targetSheetName];
    return processWorksheet(worksheet, opts, result);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Lỗi parse file Excel';
    result.errors.push(errorMessage);
    return result;
  }
};

/**
 * Main import function - handles CSV and Excel files
 */
export const importFile = async (
  file: File, 
  options: ImportOptions = {}
): Promise<ImportResult> => {
  // Validate file
  const validationErrors = validateFile(file, options);
  if (validationErrors.length > 0) {
    toast({
      variant: 'destructive',
      title: 'File không hợp lệ',
      description: validationErrors.join('; '),
    });
    return {
      data: [],
      headers: [],
      totalRows: 0,
      errors: validationErrors,
    };
  }

  try {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (extension === '.csv') {
      const csvText = await readFileAsText(file);
      const result = parseCSV(csvText, options);
      
      if (result.errors.length > 0) {
        toast({
          variant: 'destructive',
          title: 'Lỗi import',
          description: `${result.errors.length} lỗi được tìm thấy`,
        });
      } else {
        toast({
          title: 'Import thành công',
          description: `Đã import ${result.totalRows} dòng dữ liệu từ file CSV`,
        });
      }
      
      return result;
    } else if (extension === '.xlsx' || extension === '.xls') {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const result = parseExcel(arrayBuffer, options);
      
      if (result.errors.length > 0) {
        toast({
          variant: 'destructive',
          title: 'Lỗi import',
          description: `${result.errors.length} lỗi được tìm thấy`,
        });
      } else {
        toast({
          title: 'Import thành công',
          description: `Đã import ${result.totalRows} dòng dữ liệu từ file Excel`,
        });
      }
      
      return result;
    } else {
      const error = 'Định dạng file không được hỗ trợ. Chỉ chấp nhận: .csv, .xlsx, .xls';
      toast({
        variant: 'destructive',
        title: 'File không hỗ trợ',
        description: error,
      });
      return {
        data: [],
        headers: [],
        totalRows: 0,
        errors: [error],
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Lỗi không xác định';
    toast({
      variant: 'destructive',
      title: 'Lỗi import file',
      description: errorMessage,
    });
    return {
      data: [],
      headers: [],
      totalRows: 0,
      errors: [errorMessage],
    };
  }
};

/**
 * Get all sheet names from Excel file
 */
export const getExcelSheetNames = async (file: File): Promise<string[]> => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    return workbook.SheetNames;
  } catch (error) {
    console.error('Error reading Excel sheet names:', error);
    return [];
  }
};

/**
 * Parse specific Excel sheet by name
 */
export const parseExcelSheet = (
  arrayBuffer: ArrayBuffer, 
  sheetName: string, 
  options: ImportOptions = {}
): ImportResult => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const result: ImportResult = {
    data: [],
    headers: [],
    totalRows: 0,
    errors: [],
  };

  try {
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    if (!workbook.SheetNames.includes(sheetName)) {
      const availableSheets = workbook.SheetNames.join(', ');
      result.errors.push(`Sheet '${sheetName}' không tồn tại. Các sheet có sẵn: ${availableSheets}`);
      return result;
    }

    const worksheet = workbook.Sheets[sheetName];
    return processWorksheet(worksheet, opts, result);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Lỗi parse Excel sheet';
    result.errors.push(errorMessage);
    return result;
  }
};

/**
 * Extract specific columns from imported data
 */
export const extractColumns = (
  data: ImportedRow[], 
  columnMapping: { [key: string]: string }
): any[] => {
  return data.map(row => {
    const extractedRow: any = {};
    Object.entries(columnMapping).forEach(([newKey, originalKey]) => {
      extractedRow[newKey] = row[originalKey] || '';
    });
    return extractedRow;
  });
};

/**
 * Validate and extract specific columns
 */
export const validateAndExtractColumns = (
  result: ImportResult,
  requiredColumns: string[]
): { success: boolean; data: any[]; errors: string[] } => {
  const errors: string[] = [...result.errors];
  
  // Check if all required columns exist
  const missingColumns = requiredColumns.filter(
    col => !result.headers.includes(col)
  );
  
  if (missingColumns.length > 0) {
    errors.push(`Thiếu các cột bắt buộc: ${missingColumns.join(', ')}`);
    return { success: false, data: [], errors };
  }
  
  // Extract only required columns
  const extractedData = result.data.map(row => {
    const newRow: any = {};
    requiredColumns.forEach(col => {
      newRow[col] = row[col];
    });
    return newRow;
  });
  
  return { 
    success: errors.length === 0, 
    data: extractedData, 
    errors 
  };
};

/**
 * Download sample CSV template
 */
export const downloadSampleCSV = (headers: string[], filename: string = 'sample.csv') => {
  const csvContent = headers.join(',') + '\n' + headers.map(() => '').join(',');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Download thành công',
      description: `File mẫu ${filename} đã được tải về`,
    });
  }
};

/**
 * Download sample Excel template
 */
export const downloadSampleExcel = (headers: string[], filename: string = 'sample.xlsx') => {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Create worksheet data with headers
    const worksheetData = [headers];
    
    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    // Write file
    XLSX.writeFile(workbook, filename);
    
    toast({
      title: 'Download thành công',
      description: `File mẫu Excel ${filename} đã được tải về`,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Lỗi tạo file Excel';
    toast({
      variant: 'destructive',
      title: 'Lỗi download',
      description: errorMessage,
    });
  }
};
