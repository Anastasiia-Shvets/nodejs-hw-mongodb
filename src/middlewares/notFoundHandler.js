export const notFoundHandler = (req, res, naxt) => {
    res.status(404).json({
        message: 'Router not found',
    });
};
