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
        power: parseInt(formData.power.replace(/\./g, ""), 10),
        killPoint: parseInt(formData.killPoint.replace(/\./g, ""), 10),
      };

      // Using authorized Axios instance
      const response = await authorizedAxiosInstance.post(
        "/api/applications",
        apiData
      );

      return response.data;
    } catch (error: any) {
      // Ensure we always return a string, never an object
      let errorMessage = "Failed to submit application";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (
        error.response?.data &&
        typeof error.response.data === "string"
      ) {
        errorMessage = error.response.data;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Double check that errorMessage is a string
      if (typeof errorMessage !== "string") {
        errorMessage = "An unexpected error occurred";
      }

      return rejectWithValue(errorMessage);
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
        // Ensure error is always a string
        const errorPayload = action.payload;
        if (typeof errorPayload === "string") {
          state.error = errorPayload;
        } else {
          state.error = "An error occurred";
        }
      });
  },
});

export const { updateFormData, resetForm, setSubmitting } =
  recruitmentSlice.actions;
export default recruitmentSlice.reducer;
