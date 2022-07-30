export const addContact = (formData) =>
{
    return {
        type: "ADD_CONTACT",
        payload: {
            id: new Date().getTime().toString(),
            name: formData.name,
            phone: formData.phone,
            email: formData.email
        },
    
    }
};

export const deleteContact = (id) =>
{
    return {
        type: "DELETE_CONTACT",
        id
    
    }
};


export const editContact = (id, data) =>
{
    return {
        type: "EDIT_CONTACT",
        
    }
};

export const saveEditedContact = (value) =>
{
    return {
        type: "SAVE_CONTACT",
        payload: {
            eid: value.id,
            ename: value.name,
            ephone: value.phone,
            eemail: value.email
        }
    }
}


export const storeContact = () =>
{
    return {
        type: "STORE_CONTACT",
        payload: "reduxContact"
    }
}