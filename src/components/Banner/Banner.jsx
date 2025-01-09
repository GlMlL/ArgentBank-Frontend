import React from 'react'
import '../../styles/Banner.css';


function banner() {
    return (
        <section className="hero_banner">
            <article className="content_hero_banner">
                {/*<h2 className="hidden">Promoted Content</h2>*/}

                <p className="subtitle">No fees.</p>
                <p className="subtitle">No minimum deposit.</p>
                <p className="subtitle">High interest rates.</p>

                <span className="text">Open a savings account with Argent Bank today!</span>
            </article>
        </section>
    )


}

export default banner