import React from 'react'
import styles from './Layout.module.css';

const Layout = (props) => {
    return (
        <main className={styles.Content}>
            {props.children}
        </main>
    );
}

export default Layout;