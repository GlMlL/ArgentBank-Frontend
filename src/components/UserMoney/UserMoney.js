import React from 'react'
import '../../styles/UserMoney.css';
import Button from '../Button/Button';

function userMoney({ title, subtitle, content }) {
    return (
        <article className="account">
            <div className="account_content">
                <h3 className="account_title">{title}</h3>
                <span className="money">{content}</span>
                <p className="acount_subtitle">{subtitle}</p>
            </div>
            <Button content="View Transactions" />
        </article>
    )
}

export default userMoney
// Ce composant représente les informations sur le compte utilisateur, il peut être réutilisable.