
export const saveTokenInCookie = (res , token) => {

    const cookieOptions = {
        expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000 )),
        httpOnly: true
    }

    if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt" , token , cookieOptions)
}

