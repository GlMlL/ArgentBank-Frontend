import React from 'react'
import '../../styles/UserMoney.css';
import Button from '../Button/Button';

function UserMoney({ title, subtitle, content }) {
    return (
        <article className="account">
            <div className="account_content">
                <h3 className="account_title">{title}</h3>
                <span className="money">{content}</span>
                <p className="account_subtitle">{subtitle}</p>
            </div>
            <Button content="View Transactions" />
        </article>
    )
}

export default UserMoney
