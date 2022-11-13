import * as yup from 'yup'

const name = "Soheil"

export const PersonValidationSchema = yup.object().shape({
    firstname: yup.string().required("" + name + " for fuck's sake! Fist name is required"),
    lastname: yup.string().required("" + name + " for fuck's sake! Last name is required"),
    address: yup.string().required("" + name + " for fuck's sake! Address is required"),
    phone: yup.number().integer().positive().min(10000000).max(99999999).required("" + name + " for fuck's sake! Phone number is required")
})