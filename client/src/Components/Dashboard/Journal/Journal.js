import React, { useState } from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import Layout from "../../../Containers/Dashboard/Layout.container";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import "./journal.scss";
registerLocale("fr", fr);

const Journal = () => {
    const [showPost, setShowPost] = useState(false);

    return (
        <Layout title="Journal">
            <div className="journal">
                <div className="journal-actions">
                    <div className="actions-left">
                        <Button size="small" primary>
                            New
                        </Button>
                    </div>
                    <div className="actions-right">
                        <Input type="date" onChange={(e) => console.log(e.target.value)} />
                        <Input type="date" />

                        <Button size="small" secondary>
                            Filter
                        </Button>
                    </div>
                </div>
                <div className="journal-posts">
                    <div className="post">
                        <div className="post-header">
                            <div className="header-left">
                                <div className="header__title">Today is a great day in trading !</div>
                            </div>
                            <div className="header-right">
                                <div className="header__date">01/11/2020</div>
                                <div className="header__emote">
                                    <Icon name="smile" size="big" />
                                </div>
                            </div>
                        </div>
                        <div className="post-content">
                            <div className="content-intro">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni natus, quis incidunt odio
                                tenetur deserunt! Eum quos placeat modi consectetur accusantium itaque. Quae corrupti
                                recusandae laudantium consectetur animi officia beatae?
                            </div>
                            {showPost && (
                                <div className={`content-hidden${showPost ? " post-visible" : ""}`}>
                                    <div className="content-container">
                                        <div className="content__title">What does the market do? Events ?</div>
                                        <div className="content__text">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eos aut
                                            porro. Minus voluptate, magni beatae unde hic voluptates, provident iusto
                                            ratione veniam quo error dignissimos, nostrum illum inventore a.
                                        </div>
                                    </div>
                                    <div className="content-container">
                                        <div className="content__title">
                                            What do I do? I act in my own interest? Am I following my plan?
                                        </div>
                                        <div className="content__text">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eos aut
                                            porro. Minus voluptate, magni beatae unde hic voluptates, provident iusto
                                            ratione veniam quo error dignissimos, nostrum illum inventore a.
                                        </div>
                                    </div>
                                    <div className="content-container">
                                        <div className="content__title">What have I learned today?</div>
                                        <div className="content__text">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eos aut
                                            porro. Minus voluptate, magni beatae unde hic voluptates, provident iusto
                                            ratione veniam quo error dignissimos, nostrum illum inventore a.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="post-footer">
                            <Button size="mini" secondary>
                                Edit
                            </Button>
                            <Button size="mini" primary onClick={() => setShowPost(!showPost)}>
                                {showPost ? "See less" : "See more"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Journal;
