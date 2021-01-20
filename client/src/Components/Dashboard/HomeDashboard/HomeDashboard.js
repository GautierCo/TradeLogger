import React from "react";
import Layout from "../../../Containers/Dashboard/Layout.container";

const HomeDashboard = ({ pseudo }) => {
    return (
        <Layout title="Dashboard">
            <h3>Bienvenue {pseudo}</h3>
            <p>Si tu souhaites me rapporter un bug, je vais créer un canal sur discord</p>
            <p>Merci de fournir une capture d'écran, une explication de l'action attendu, et l'action obtenu</p>
            <p>Grâce à ça je pourrais essayer de reproduire l'action et voir ce que je peux faire :D</p>
            <p>
                Je précise d'ailleurs que pas mal de champ dans les formulaires ne sont pas encore protéger sur les
                datas
            </p>
            <p>Je pense faire un autre canal discord ou vous pouvez mettre des features qui pourrait être pratique</p>
            <p>Merci</p>
        </Layout>
    );
};

export default HomeDashboard;
