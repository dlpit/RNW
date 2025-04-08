import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "@/utils/authorizeAxios";

export interface RecruitmentFormData {
  ingame: string;
  idIngame: string;
  power: string;
  killPoint: string;
  email: string;
  language: string;
  country: string;
}

interface RecruitmentState {
  formData: RecruitmentFormData;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const initialState: RecruitmentState = {
  formData: {
    ingame: "",
    idIngame: "",
    power: "",
    killPoint: "",
    email: "",
    language: "Vietnamese",
    country: "Vietnam",
  },
  isSubmitting: false,
  isSubmitted: false,
  error: null,
};

export const submitApplication = createAsyncThunk(
  "recruitment/submitApplication",
  async (formData: RecruitmentFormData, { rejectWithValue }) => {
    try {
      // Convert power and killPoint to numbers for API
      const apiData = {
        ...formData,
        power: parseInt(formData.power.replace(/,/g, ""), 10),
        killPoint: parseInt(formData.killPoint.replace(/,/g, ""), 10),
      };

      // Using Axios instead of fetch
      const response = await authorizedAxiosInstance.post(
        "/api/applications",
        apiData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to submit application"
      );
    }
  }
);

export const recruitmentSlice = createSlice({
  name: "recruitment",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.isSubmitted = false;
      state.error = null;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSubmitted = true;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = (action.payload as string) || "An error occurred";
      });
  },
});

export const { updateFormData, resetForm, setSubmitting } =
  recruitmentSlice.actions;
export default recruitmentSlice.reducer;
