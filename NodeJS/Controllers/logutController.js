const logoutController = (req, res) => {
    const data = {
        title: "result management system"
    }
    req.session.destroy((err) => {
        if (err) {
            console.log("asishW");
            var data = "error in code";
            res.render("homepage", data);
        }
        else {

            console.log("jaiswal");

            res.render('homepage');
        }
    }
    );

}


export { logoutController }