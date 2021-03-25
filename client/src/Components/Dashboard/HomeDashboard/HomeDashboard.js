import React from "react";
import Layout from "../../../Containers/Dashboard/Layout.container";

const HomeDashboard = ({ pseudo }) => {
    return (
        <Layout title="Dashboard">
            <h3>Bienvenue {pseudo}</h3>
            <p>Si tu souhaites me rapporter un bug, je vais créer un canal sur discord.</p>
            <p>Merci de fournir une capture d'écran, une explication de l'action attendue et l'action obtenue</p>
            <p>Grâce à ça je pourrais essayer de reproduire l'action et voir ce que je peux faire.</p>
            <p>Merci</p>
        </Layout>
    );
};

export default HomeDashboard;
