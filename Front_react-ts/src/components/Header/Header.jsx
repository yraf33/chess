import './Header.css'


export default function Header() {
    return (
    <header>
        
        <div className="logo" href="#index" >
            {/* ♞ */}
            <a href="#index">
            {/* <img src="./knight.svg"  alt="Логотип" width="50" height="50"/> */}
            <embed src="./knight.svg" type="image/svg+xml" />
        </a>
        </div>
        <nav>
            <a href="#rules">Главная</a>
            <a href="#rules">Правила</a>
            <a href="#players"></a>
            <a href="#tournaments"></a>
        </nav>
        <div className="auth-profile">
            <a id="login-btn" href="#login">Авторизация</a>
            <a id="profile-btn" href="#profile">Профиль</a>
        </div>
    </header>
    )
}