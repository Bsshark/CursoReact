test('Esta prueba no debe de fallar.', () => {
    if( 1 === 0) {
        throw new Error('No puede divir entre 0');
    }
});