import './Page.scss';

type pageT = {
    title: string,
    children: React.ReactNode
}

export const Page = ({title, children} : pageT) => {
    return <div className={'page'}>
        <div className="page__inside">
            <header className="header">
                <h1 className="header__title">{title}</h1>
            </header>
            <main className={'main'}>
                {children}
            </main>
            <footer className="footer" />
        </div>
    </div>
}