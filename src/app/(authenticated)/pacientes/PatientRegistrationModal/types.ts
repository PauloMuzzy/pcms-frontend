export interface FormDataProps {
  name: string
  lastName: string
  cpf: string
  email: string
  dateOfBirth: string
  profession: string
  phone: string
  gender: string
  registerDate: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
}

export interface PatientRegistrationModalProps {
  onFinishRegistration: () => void
  openModal: boolean
  setIsModalVisible: (value: boolean) => void
}
