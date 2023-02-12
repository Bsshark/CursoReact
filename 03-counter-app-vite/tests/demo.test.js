describe('Pruebas en <DemoComponent />', () => {
    test('Esta prueba no debe de fallar.', () => {
        // 1. Inicializacion
        const message1 = 'Hola mundo';
    
        // 2. Estímulo
        const message2 = message1.trim();
    
        // 3. Comportamiento esperado
        //expect(message1).toBe(message2);
        expect(message1).toBe(message2);
    });

})

