import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    editModalIsOpen: false,
    confirmModalIsOpen: false,
    todo: {
      id: '',
      title: '',
      content: '',
      status: '',
    },
  },
  reducers: {
    openEditModal: (state, action) => {
      state.todo = action.payload
      state.editModalIsOpen = true
    },
    openConfirmModal: (state, action) => {
      state.todo = action.payload
      state.confirmModalIsOpen = true
    },
    closeModal: (state) => {
      state.confirmModalIsOpen = false
      state.editModalIsOpen = false
    },
  },
})

export const { openEditModal, openConfirmModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
