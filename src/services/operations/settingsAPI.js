import toast from 'react-hot-toast'
import {settingsEndpoints} from '../APIs'
import { APIconnector } from '../APIconnector'
import {logout} from './authAPI'
import { setUser } from '../../reducer/slices/profileSlice'

const {UPDATE_DISPLAY_PICTURE_API,UPDATE_PROFILE_API,CHANGE_PASSWORD_API,DELETE_PROFILE_API} = settingsEndpoints;

export function changePassword(data,token){
    return async(dispatch) => {
        const toastId = toast.loading("Please wait...");
        try{

            const options = {
                oldPassword:data.currentPassword,
                newPassword:data.newPassword,
            }

            const response = await APIconnector("POST",CHANGE_PASSWORD_API,options,{Authorization: `Bearer ${token}`});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password Changed Successfully");
        }catch(e){
            toast.error("Incorrect Old password");
            console.log(e);
        }
        toast.dismiss(toastId);
    }
}

export function deleteAccount(token,navigate){
    
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await APIconnector("DELETE",DELETE_PROFILE_API,null, {Authorization: `Bearer ${token}`});
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account Deleted SuccessFully");
            dispatch(logout(navigate));
        }catch(e){
            console.log("Unable to Delete your Account");
            toast.error("Unable to Delete your Account");
            console.log(e);
        }
        toast.dismiss(toastId);
    }
}

// NOT COMPLETED
export function updateProfile(data,token,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Please Wait...");
        try{    
            const options = {
                firstName : data.firstName,
                lastName : data.lastName,
                dateOfBirth : data.dateOfBirth,
                about : data.about,
                contactNumber : data.phoneNumber,
                countryCode : data.countryCode,
                gender : data.gender,
            }

            console.log(options);
            const response = await APIconnector("PUT",UPDATE_PROFILE_API,options,{Authorization: `Bearer ${token}`});

            // const userImage = response.data.updatedUserDetails.image? response.data.updatedUserDetails.image: `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;
            dispatch(setUser({ ...response.data.updatedUserDetails}));

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Profile Updated SuccessFully");

        }catch(e){
            console.error(e);
            console.log("Unable to update profile");
            toast.error("Unable to Update Profile");
        }
        navigate("/dashboard/settings");
        toast.dismiss(toastId);
    }
}
