import calendarApi from "../../src/api/calendarApi";

describe('Pruebas en calendarApi', () => { 
    it('Debe de tener la configuracion por defecto', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

    it('Debe tener el x-token en el header de todas las peticiones', async() => {
        const token = 'ABC-123-XYZ';
        localStorage.setItem('token', token);

        const res = await calendarApi.post('/auth', {
            email: 'test@google.com',
            password: '123456'
        });

        expect(res.config.headers['x-token']).toBe(token);

    });
 })
