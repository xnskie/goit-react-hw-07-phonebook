import axios from "axios";

const contactInstance = axios.create({
    baseURL:'https://6400f0a13779a862624fa78c.mockapi.io/contacts/'
})

export const getAllContacts = async() => {
    const {data} = await contactInstance.get("/");
    return data;
}

export const addContact = async(data) => {
    const {data: result} = await contactInstance.post("/", data);
    return result;
}

export const deleteBook = async(id) => {
    const {data} = contactInstance.delete(`/${id}`);
    return data;
}