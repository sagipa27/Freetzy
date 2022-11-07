export const getPrivateData = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        data: 'Has obtenido acceso a la informarcion privada de este Route',
    });
};