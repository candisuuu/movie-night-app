import React from 'react';
import Link from './Link';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

function Header({ isLoggedIn }) {
    let loginSuccessOptions,
        loginButton = <LoginButton />,
        loginBarClasses = "justify-around sm:justify-start";

    if (isLoggedIn) {
        loginSuccessOptions = <>
                                <div className="flex justify-between w-1/3">
                                    <Link href="/" className="w-1/2">
                                        Search Movies
                                    </Link>
                                    <Link href="/upvote" className="w-1/2">
                                        Upvoted Movies
                                    </Link>
                                </div>
                                <LogoutButton />
                            </>;
        loginButton = "";
        loginBarClasses = "justify-between";
    }
    
    return (
        <div className="container mx-auto p-4">
            <div className={`flex flex-row items-center ${loginBarClasses} h-10`}>
                {loginButton}
                {loginSuccessOptions}
            </div>
        </div>
    );
};

export default Header;