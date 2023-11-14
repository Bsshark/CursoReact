import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";
cloudinary.config({
    cloud_name: 'dnh7umpao',
    api_key: '818957431275683',
    api_secret: '260GucqjwvGZ1Jvmq4OlAxNECXo',
    secure: true
});

describe('Pruebas en File Upload', () => { 
    it('Debe de subir el archivo correctamente', async() => {
        
        const imgUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const resp = await fetch(imgUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect( typeof url).toBe('string');

        //Limpieza de archivo subido
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');
        
        const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId]);
        //console.log(cloudResp);

    });

    it('Debe de retornar null', async() => {
        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);
        expect(url).toBe(null);
    });


 })