import {create} from "zustand"
import axios from "axios"

const AUTH_API_URL = "http://localhost:5000/api/auth"
axios.defaults.withCredentials = true;

export const useAuth = create((set) => ({
    user: null,
    loading: false,
    error: null,

    // initialize / restore auth state from backend cookie
    init: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${AUTH_API_URL}/check-auth`, { withCredentials: true });
            set({ user: response?.data?.user || null, loading: false });
        } catch (error) {
            set({ user: null, loading: false });
            throw error;
        }
    },

    signup: async (username, email, password) => {
        set({loading: true, error: null})
        try {
            const response = await axios.post(`${AUTH_API_URL}/signup`, {username, email, password})
            set({user: response?.data?.user, loading: false})
        } catch (error) {
            set({error: error.response?.data?.message || error.message, loading: false})
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({loading: true, error: null})
        try {
            const response = await axios.post(`${AUTH_API_URL}/verify-email`, {verificationCode: code})
            set({user: response?.data?.user, loading: false})
        } catch (error) {
            set({error: error.response?.data?.message || error.message, loading: false})
            throw error;
        }
    },
    login: async (email, password) => {
        set({loading: true, error: null})
        try {
            const response = await axios.post(`${AUTH_API_URL}/login`, {email, password}, {withCredentials: true})
            set({user: response?.data?.user, loading: false})
        } catch (error) {
            set({error: error.response?.data?.message || error.message, loading: false})
            throw error;
        }
    },
    logout: async () => {
        set({loading: true, error: null})
        try {
            await axios.post(`${AUTH_API_URL}/signout`, {}, {withCredentials: true})
            set({user: null, loading: false})
        } catch (error) {
            set({error: error.response?.data?.message || error.message, loading: false})
            throw error;
        }
    },
    forgetPassword: async (email) => {
        set({loading: true, error: null})
        try {
            await axios.post(`${AUTH_API_URL}/forget-password`,{email}, {withCredentials: true})
            set({loading: false})
        } catch(error){
            set({error: error.response?.data?.message || error.message, loading: false})
            throw error;
        }
    },
    resetPassword: async (token, newPassword) => {
        set({loading: true, error: null})
        try {
            await axios.post(`${AUTH_API_URL}/reset-password/${token}`, {password: newPassword}, {withCredentials: true})
            set({loading: false})
        } catch (error) {
            set({error: error.response?.data?.message || error.message, loading: false})
            throw error;
        }
    }
}))