import Link from './Link';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Header({ isLoggedIn }) {
    let loginSuccessOptions,
        loginButton = <LoginButton />,
        loginBarClasses = "justify-around sm:justify-start";

    if (isLoggedIn) {
        loginSuccessOptions = <>
                                <div className="flex justify-between w-1/2">
                                    <Link href="/" className="w-1/2 mr-2">
                                        Search Movies
                                    </Link>
                                    <Link href="/upvote" className="w-1/2 mr-2">
                                        Upvoted Movies
                                    </Link>
                                    <Link href="/profile" className="w-1/2">
                                        Profile Settings
                                    </Link>
                                </div>
                                <LogoutButton />
                            </>;
        loginButton = "";
        loginBarClasses = "justify-between";
    }
    
    return (
        <div className="fixed z-10 w-full bg-white dark:bg-slate-800 border-slate-300 shadow-lg dark:text-white">
            <div className={`container mx-auto p-4 flex flex-row items-center ${loginBarClasses}`}>
                {loginButton}
                {loginSuccessOptions}
            </div>
        </div>
    );
};

export default Header;