const indexController = (req, res) => {
    const data = {
        title: "result management system"
    }

    res.render('homepage', data);
}





export { indexController }