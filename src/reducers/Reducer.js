const initialState = {
    list: [],
    inputValue: {}
};


const contactReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case "ADD_CONTACT":

            const { id, name, phone, email } = action.payload;

            if (!id || !name || !phone || !email) {
                
                window.alert("please fill");

                return {
                    list: []
                };
            } else {
                
            
                return {
                
                    list: [
                        ...state.list,
                        {
                            id: id,
                            name: name,
                            phone: phone,
                            email: email
                        }
                    ]
                };
            }
        
        
        case "DELETE_CONTACT":
            
            const newContact = state.list.filter((ele) => ele.id !== action.id);
            console.log(newContact);
            
            return {
                list: newContact
            };
        


        case "SAVE_CONTACT":
            
            const { eid, ename, ephone, eemail } = action.payload;

            

            const editedItem = state.list.map((ele) =>
            {
                if (ele.id === eid) {
                   
                    return {
                        id: eid,
                        name: ename,
                        phone: ephone,
                        email: eemail
                    };
                } else {
                    return ele;
                }
            });
            
            console.log(editedItem);

            return {
                list: editedItem
            };

        case "STORE_CONTACT":
            
            const storeContact = () =>
            {
                const localData = localStorage.getItem(action.payload);

                if (localData) {
                    
                    return JSON.parse(localData);
                } else {
                    return state.list;
                }
            };
            
            console.log(storeContact);
            
            

        default: return state;
    };
};


export default contactReducer;