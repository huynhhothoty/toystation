import { toyUrl } from '../utils/api/apis';
import customAxios from './CustomAxios';
import supabase, { supabaseUrl } from './supabase';

export async function getToys(filter) {
    try {
        let mainUrl = toyUrl;
        if (Object.keys(filter).length > 0) {
            mainUrl += '?';
            for (const key in filter) {
                mainUrl += `${key}=${filter[key]}`;
            }
        }

        const res = await customAxios({
            method: 'get',
            url: mainUrl,
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function getToyDetail(toyId) {
    try {
        const res = await customAxios({
            method: 'get',
            url: `${toyUrl}/${toyId}`,
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}

export async function updateToy({ toyId, data }) {
    const userToken = localStorage.getItem('user_token');

    let imageName, imagePath;
    let updateData = { ...data };
    if ('image' in data) {
        imageName = `${Date.now()}-${data.image.name}`;
        imagePath = `${supabaseUrl}/storage/v1/object/public/toy-images/${imageName}`;
        updateData = { ...updateData, image: imagePath };
    }

    let res;
    try {
        res = await customAxios({
            method: 'patch',
            url: `${toyUrl}/${toyId}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
            data: updateData,
        });
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }

    if ('image' in data) {
        const { error: uploadError } = await supabase.storage
            .from('toy-images')
            .upload(imageName, data.image);

        if (uploadError) {
            throw new Error('Update successfully but there is error when upload new image');
        }
    }

    return res.data.data;
}
export async function createToy({ data }) {
    const userToken = localStorage.getItem('user_token');

    const imageName = `${Date.now()}-${data.image.name}`;
    const imagePath = `${supabaseUrl}/storage/v1/object/public/toy-images/${imageName}`;

    let res;
    try {
        res = await customAxios({
            method: 'post',
            url: toyUrl,
            data: { ...data, image: imagePath },
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }

    // if not occur error, upload image
    const { error: uploadError } = await supabase.storage
        .from('toy-images')
        .upload(imageName, data.image);

    if (uploadError) {
        await deleteToy(res.data.data._id);
        throw new Error('Error when upload toy image');
    }

    return res.data.data;
}

export async function deleteToy(toyId) {
    const userToken = localStorage.getItem('user_token');

    try {
        const res = await customAxios({
            method: 'delete',
            url: `${toyUrl}/${toyId}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
        });

        return res.data.data;
    } catch (error) {
        const errMsg = error.response.data.message;
        throw new Error(errMsg);
    }
}
