import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FullRow from '../components/FullRow.js';

export class CompetitionScreen extends React.Component {
    render() {
        return <div>
            <FullRow>
                <nav className="breadcrumb-container">
                    <ol className="breadcrumb">
                        <li style={{ marginRight: '0.5em' }}><i className="fas fa-angle-right"></i></li>
                        <li className="breadcrumb-item"><Link to="/competition">Competition</Link></li>
                    </ol>
                </nav>
            </FullRow>
            <FullRow>
                <div align="center"><img src="/img/colombia/banner.png" width="60%" /></div>
            </FullRow>
            <FullRow style={{ padding: '2em 1em' }}>
                <h3>Welcome!</h3>
                <p>Welcome to the first edition of the <strong><a href="https://www.jalasoft.com">Jalasoft’s</a> Universal JsBattle Championship</strong>:
                an innovative and addictive battle game based on the <strong>great</strong> <a href="https://jsbattle.jmrlab.com/">JSBattle</a>, 
                where you program your tank with artificial intelligence to fight against other competitors in a battlefield. By the way, <i>JS</i> stands for <i>JavaScript</i> :P </p>
                <p>This is an internal competition targetted for Jalasoft’s employees <strong>exclusively</strong> at this time.</p>

                <h3>Structure</h3>
                <p>To learn more about the JsBattle dynamics please read the <a href="./docs">available documentation</a></p>
                <p>The competition will start with this initial schedule:</p>
                <div align="center"><img src="/img/colombia/schedule.png" width="70%" /></div>
                <ul>
                    <li>During the <i>Sign In Period</i> the participants need to register to the championship using <a href="https://forms.gle/tQcu14VTbDfTw4Lx9">this registration form</a></li>
                    <li>The competition site will be available for tank training and experimientation to everybody (including <i>guest access</i>)</li>
                    <li>The <i>Jalasof't SSO Login</i> option will be available during all the duration of the event so Jalasoft empoyees can safely store their tank code.</li>
                    <li>On Sept 15th 2020 the <i>tanks registry stage</i> will be enabled: during this period the battle league (melee league) will be launched and participants shall join their tank to this league</li>
                    <li>After the tank registry period, the <a href="mailto:jsbattle@jalasoft.com">Jury Committee</a> will review the code sent by participants (verify code fullfills with the <i>competition rules</i> and <i>code of conduct</i>)</li>
                    <li>After this Jury review, the battle league will start with the approved tanks.</li>
                    <li>The league is based on a <i>all-against-all</i> mode (<a href="https://en.wikipedia.org/wiki/Melee">melee</a>)</li>
                    <li>During the melee league, the intermediate results will be available on the <a href="#/news">news</a> section.</li>
                    <li>Once the league finishes, the results will be published on this site.</li>
                </ul>

                <p>After this initial league, and <i>depending</i> on the number of participants, the Jury will choose the <strong>top X</strong> tanks with the best scores to participate in a <i>subsequent</i> league until we indetify the 3rd, 2nd and 1st top scores</p>
                <p>The schedule of a subsequent league will be communicated after the results are available. </p>
League structure example:
<ul>
                    <li>If 32+ Participants = 5 Leagues: Melee-(Top 16)-(Top 8)-(Top 4)-Final With Top 2</li>
                    <li>If 16+ Participants = 4 Leagues: Melee-(Top 8)-(Top 4)-Final With Top 2</li>
                    <li>If 8+ Participants = 3 Leagues: Melee-(Top 4)-Final With Top 2</li>
                </ul>
                <p>

                </p>
                <h3>About the Prizes</h3>
                <ul>
                    <li><strong>1st</strong>: Up to US$ 50 on <a href='https://www.udemy.com/'>Udemy Courses</a></li>
                    <li><strong>2nd</strong>: Up to US$ 25 on <a href='https://www.udemy.com/'>Udemy Courses</a></li>
                    <li><strong>3rd</strong>: Jala Souvenir Pack</li>
                </ul>
                <h3>Contact</h3>
                <ul>
                    <li><a href="mailto:jsbattle@jalasoft.com">Organization and Jury Committee</a></li>
                    <li><a href="https://jalasoft.slack.com/archives/C019BTFMD40">JSBattle Slack Channel</a></li>
                    <li><a href="https://www.twitch.tv/jsbattles">Twich Channel</a> (training session comming soon!)</li>
                </ul>
                <h3>Competition Rules</h3>
                <p>These are the competition rules for this championship:</p>
                <ol type="i">
                    <li>Competition is open to all Jalasoft employees</li>
                    <li>To enter the competition,  it is mandatory to timely fulfill the <a href="https://forms.gle/tQcu14VTbDfTw4Lx9">registration form</a>.  Incorrectly completed registration will be disqualified.</li>
                    <li>You need to comply with the <i>Code of Conduct</i> at any time in the event.</li>
                    <li>Only one entry per participant, e.g. do not use multiple <strong>Jala SSO accounts</strong>, neither yours or from others.</li>
                    <li>Participants are allowed to freely access the JSBattle platform resources (sandbox, manuals, challenges, etc.)</li>
                    <li>The panel of judges of the <a href="mailto:jsbattle@jalasoft.com">Jury Committee</a> will be comprised of members of Jalasoft.</li>
                    <li>All submitted code for the tanks needs to be non-obfuscated in any way or form.</li>
                    <li>Participants encountering any issue/bug on the JsBattle platform must communicate it to the <a href="mailto:jsbattle@jalasoft.com">Jury Committee.</a></li>
                    <li>Participants should avoid sharing formulae, logic, or any other significant aspect of their code with peers during a contest.</li>
                    <li>In case of proven plagiarism spotted by the Jury Committee, the participant will be suspended from competition.</li>
                    <li>The contest is organized in leagues with specific durations. The exact schedule of the next leagues will be communicated after the 1st melee league.</li>
                    <li>Each participant needs to join his/her tank on the league on the dates established.</li>
                    <li>After each league cycle, the league winners will be publicly notified.</li>
                    <li>All communications to participants will be made by e-mail.</li>
                    <li>The prize is not transferable.</li>
                    <li>No part of a prize is exchangeable for cash or any other prize.</li>
                </ol>
                <h3>Code of Conduct</h3>
                <p>This is the <i>code of conduct</i> for all participants on the championship:</p>
                <ol type="A">
                    <li>Participants must take good care of their code, by protecting from being leaked, getting shared, and getting copied by other audiences.</li>
                    <li>Participants should not hack or modify the JSBattle platform in any way, shape or form to obtain any advantage over peers or Jury Committee.</li>
                    <li>Participants' code should fully adhere to the competition rules.</li>
                    <li>Participants should stay honest with their peers, e.g. do not interfere with DOM directly, do not block normal simulation flows, do not use 3rd Party Libs other than the ones provided/allowed by the platform, etc.)</li>
                    <li>Participants should not try any dishonest means to move up the match results, peers code, or lead to platform's malfunction.</li>
                    <li>Participants not adhering to the above set of conduct guidelines may lead to suspension of their participation in the competition.</li>
                </ol>
            </FullRow>
        </div>;
    }
}

export default connect()(CompetitionScreen);
