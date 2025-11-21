import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customizations: [], // User's customizations
  businessCustomizations: [
    // Pre-made business customizations for showcase
    {
      id: "biz-1",
      productId: 500,
      product: {
        id: 500,
        name: "Custom Engraved Pendant",
        category: "Custom",
        price: 15000,
        image: "custom-01.jpg",
      },
      text: "Forever Love - Sarah & John",
      image: null,
      notes: "Engraved with wedding date",
      createdAt: "2024-11-15T10:00:00.000Z",
      isBusiness: true,
    },
    {
      id: "biz-2",
      productId: 501,
      product: {
        id: 501,
        name: "Bespoke Wedding Ring",
        category: "Custom",
        price: 45000,
        image: "custom-02.jpg",
      },
      text: "Will you marry me?",
      image: null,
      notes: "Heart-shaped diamond with custom engraving",
      createdAt: "2024-11-10T14:30:00.000Z",
      isBusiness: true,
    },
    {
      id: "biz-3",
      productId: 502,
      product: {
        id: 502,
        name: "Personalized Bracelet",
        category: "Custom",
        price: 20000,
        image: "custom-03.jpg", 
      },
      text: "Mom - Best Friend Forever",
      audio: "voice-message.mp3",
      notes: "Custom voice message engraved in QR code",
      createdAt: "2024-11-05T09:15:00.000Z",
      isBusiness: true,
    },
    {
      id: "biz-4",
      productId: 503,
      product: {
        id: 503,
        name: "Custom Name Necklace",
        category: "Custom",
        price: 18000,
        image: "custom-04.jpg",
      },
      text: "Happy Anniversary - 25 Years",
      image: "couple-photo.jpg",
      notes: "Custom photo inside locket",
      createdAt: "2024-10-28T16:45:00.000Z",
      isBusiness: true,
    },
    {
      id: "biz-5",
      productId: 504,
      product: {
        id: 504,
        name: "Engraved Cufflinks",
        category: "Custom",
        price: 12000,
        image: "custom-05.jpg",
      },
      text: "JK - Est. 2020",
      image: null,
      notes: "Personalized initials with date",
      createdAt: "2024-10-20T11:20:00.000Z",
      isBusiness: true,
    },
    {
      id: "biz-6",
      productId: 505,
      product: {
        id: 505,
        name: "Custom Photo Locket",
        category: "Custom",
        price: 25000,
        image: "custom-06.jpg",
      },
      text: "Forever in my heart",
      image: "family-photo.jpg",
      video: "memory-video.mp4",
      notes: "Photo locket with video QR code",
      createdAt: "2024-10-15T13:30:00.000Z",
      isBusiness: true,
    },
  ],
  currentCustomization: {
    productId: null,
    product: null,
    text: "",
    image: null,
    video: null,
    audio: null,
    notes: "",
    step: 1, // Step in the customization workflow
  },
  loading: false,
  error: null,
};

const customizationSlice = createSlice({
  name: "customization",
  initialState,
  reducers: {
    setCustomizations: (state, action) => {
      state.customizations = action.payload;
    },
    startCustomization: (state, action) => {
      state.currentCustomization = {
        ...initialState.currentCustomization,
        productId: action.payload.id,
        product: action.payload,
        step: 1,
      };
    },
    updateCustomizationText: (state, action) => {
      state.currentCustomization.text = action.payload;
    },
    updateCustomizationImage: (state, action) => {
      state.currentCustomization.image = action.payload;
    },
    updateCustomizationVideo: (state, action) => {
      state.currentCustomization.video = action.payload;
    },
    updateCustomizationAudio: (state, action) => {
      state.currentCustomization.audio = action.payload;
    },
    updateCustomizationNotes: (state, action) => {
      state.currentCustomization.notes = action.payload;
    },
    setCustomizationStep: (state, action) => {
      state.currentCustomization.step = action.payload;
    },
    saveCustomization: (state) => {
      const customization = {
        ...state.currentCustomization,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        isBusiness: false, // Mark as user customization
      };
      state.customizations.push(customization);
      state.currentCustomization = initialState.currentCustomization;
    },
    clearCurrentCustomization: (state) => {
      state.currentCustomization = initialState.currentCustomization;
    },
    deleteCustomization: (state, action) => {
      state.customizations = state.customizations.filter(
        (custom) => custom.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCustomizations,
  startCustomization,
  updateCustomizationText,
  updateCustomizationImage,
  updateCustomizationVideo,
  updateCustomizationAudio,
  updateCustomizationNotes,
  setCustomizationStep,
  saveCustomization,
  clearCurrentCustomization,
  deleteCustomization,
  setLoading,
  setError,
} = customizationSlice.actions;

export default customizationSlice.reducer;
