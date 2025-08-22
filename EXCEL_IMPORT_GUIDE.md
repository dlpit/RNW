# Lord Excel Import Guide

## 📋 **Luồng hoạt động**

### **1. Frontend Upload Excel File**
```javascript
const uploadExcelFile = async (file, accessToken) => {
  const formData = new FormData();
  formData.append('excelFile', file);
  
  const response = await fetch('/api/lords/import-file', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
      // Không cần Content-Type, FormData tự set
    },
    body: formData
  });
  
  return await response.json();
};

// Sử dụng
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const result = await uploadExcelFile(file, adminToken);
      console.log('Kết quả import:', result.data.summary);
      // Hiển thị kết quả cho user
      showImportResult(result.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }
};
```

### **2. Backend Xử lý File Excel**
1. **Nhận file Excel** từ frontend
2. **Parse Excel** thành JSON array
3. **Map columns** theo danh sách cột được định nghĩa
4. **Tìm Members** bằng `lord_id` hoặc `name`
5. **Create/Update Lords** với foreign key `memberId`
6. **Trả về summary** + chi tiết từng record

## 📊 **Excel Column Mapping**

### **Cột bắt buộc:**
- `lord_id` → Tìm Member.idIngame
- `name` → Tìm Member.name (fallback)

### **Power Stats:**
- `Current Power` → `currentPower`
- `Power Increase` → `powerIncrease`
- `% Power Increase` → `powerIncreasePercent`
- `Power Ranking` → `powerRanking`

### **Kill Stats:**
- `T1 Kill Increase` → `t1KillIncrease`
- `T2 Kill Increase` → `t2KillIncrease`
- `T3 Kill Increase` → `t3KillIncrease`
- `T4 Kill Increase` → `t4KillIncrease`
- `T5 Kill Increase` → `t5KillIncrease`
- `% T1-T5 Kill Increase` → `t1-t5KillIncreasePercent`

### **Resources:**
- `Gold Increase`, `% Gold Increase` → `goldIncrease`, `goldIncreasePercent`
- `Gems Increase`, `% Gems Increase` → `gemsIncrease`, `gemsIncreasePercent`
- `Wood Increase`, `% Wood Increase` → `woodIncrease`, `woodIncreasePercent`
- `Ore Increase`, `% Ore Increase` → `oreIncrease`, `oreIncreasePercent`
- `Mana Increase`, `% Mana Increase` → `manaIncrease`, `manaIncreasePercent`

### **Combat Stats:**
- `Victories Increase`, `% Victories Increase`
- `Defeats Increase`, `% Defeats Incrase` (typo preserved)
- `Dead Increase`, `% Dead Increase`
- `Healed Increase`, `% Healed Increase`
- `Helps Increase`, `% Helps Increase`

### **Current Values:**
- `gems`, `gems (new)`, `gems (old)`
- `gold`, `gold (new)`, `gold (old)`
- `wood`, `wood (new)`, `wood (old)`
- `killcount_t1-t5`, `killcount_t1-t5 (new)`, `killcount_t1-t5 (old)`

## 🎯 **Response Format**

```json
{
  "status": "success",
  "message": "Import file Excel thành công",
  "data": {
    "summary": {
      "totalRows": 1000,
      "successful": 950,
      "failed": 50,
      "created": 200,
      "updated": 750,
      "fileName": "lord_data.xlsx",
      "processedAt": "2025-08-21T10:30:00.000Z"
    },
    "details": [
      {
        "row": 1,
        "status": "success",
        "action": "created",
        "lordId": "123456789",
        "memberName": "PlayerName",
        "lordDbId": 1
      },
      {
        "row": 2,
        "status": "failed",
        "reason": "Không tìm thấy Member với lord_id: 987654321",
        "data": {...}
      }
    ]
  }
}
```

## ⚙️ **Frontend Implementation**

### **HTML Upload Form:**
```html
<input 
  type="file" 
  id="excelFile" 
  accept=".xls,.xlsx,.csv"
  onchange="handleFileUpload(event)"
/>
<button onclick="uploadFile()">Upload Lord Data</button>
<div id="uploadResult"></div>
```

### **JavaScript Handler:**
```javascript
let selectedFile = null;

const handleFileUpload = (event) => {
  selectedFile = event.target.files[0];
  
  if (selectedFile) {
    const fileSize = (selectedFile.size / 1024 / 1024).toFixed(2);
    console.log(`File selected: ${selectedFile.name} (${fileSize} MB)`);
  }
};

const uploadFile = async () => {
  if (!selectedFile) {
    alert('Vui lòng chọn file Excel');
    return;
  }
  
  try {
    document.getElementById('uploadResult').innerHTML = 'Đang upload và xử lý file...';
    
    const result = await uploadExcelFile(selectedFile, adminToken);
    
    if (result.status === 'success') {
      const summary = result.data.summary;
      document.getElementById('uploadResult').innerHTML = `
        <h3>Import thành công!</h3>
        <p>Tổng: ${summary.totalRows} dòng</p>
        <p>Thành công: ${summary.successful} dòng</p>
        <p>Thất bại: ${summary.failed} dòng</p>
        <p>Tạo mới: ${summary.created} Lords</p>
        <p>Cập nhật: ${summary.updated} Lords</p>
      `;
      
      // Refresh lord list
      loadLordsList();
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    document.getElementById('uploadResult').innerHTML = `
      <p style="color: red">Lỗi: ${error.message}</p>
    `;
  }
};
```

## 🔧 **File Requirements**

### **File Types:** 
- `.xls` (Excel 97-2003)
- `.xlsx` (Excel 2007+)  
- `.csv` (Comma-separated values)

### **File Size:** Max 50MB

### **Required Columns:**
- Phải có ít nhất `lord_id` hoặc `name`
- Các cột khác là optional

### **Data Format:**
- Numbers: `1000000`, `1.5`, `50%`
- Booleans: `true`, `false`, `1`, `0`
- Strings: Text values

## 🎉 **Hoàn thành!**

Hệ thống đã sẵn sàng:
- ✅ Upload middleware configured
- ✅ Excel processing function implemented  
- ✅ Column mapping completed
- ✅ Database integration ready
- ✅ Error handling included
- ✅ Progress logging enabled

Frontend chỉ cần upload file Excel, backend sẽ tự động xử lý và lưu vào database!
