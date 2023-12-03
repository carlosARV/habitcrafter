const moment = require('moment');

module.exports = {
    formatDate: function(date) {
        // Asegurar que la fecha sea interpretada como UTC si no está en ese formato
        const fechaUtc = moment.utc(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true);
        
        // Verificar si la fecha es válida antes de convertirla a la zona horaria local
        if (fechaUtc.isValid()) {
            const fechaLocal = fechaUtc.local();
            return fechaLocal.format('YYYY-MM-DD');
        } else {
            return 'Invalid Date';
        }
    }
};

