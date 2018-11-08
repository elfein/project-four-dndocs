import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const StyledModalGroup = styled.div`
text-align: center;
.type-group {
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around;
}
.damage, .healsource {
    opacity: 0.6;
    img {
        width: 50px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    h6 {
        margin: 4px 0 10px 0;
    }
    &:hover {
        opacity: 1;
    }
}
.selected {
    opacity: 1;
}

#overlay {
    z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: rgba(50,50,55,0.5);
  display: flex;
  opacity: 1;
  transform: scale(1) translate(-50%, -50%);
  transition: transform 0.2s ease, opacity 0.2s ease;
  &.hidden {
  opacity: 0;
  z-index: -1000;
  transform: scale(1) translate(-50%, -50%);
} 
}
#modal {
.no-error {
    display: none;
}
button {
  margin: 10px 20px;
}
p {
  text-align: center;
}
#fight {
  color: red;
}
position: fixed;
top: 50%;
left: 50%;
transition: transform 0.2s ease, opacity 0.2s ease;
opacity: 100%;
z-index: 1010;
padding: 30px;
border-radius: 3px;
background: #fff;
transform: scale(1) translate(-50%, -50%);
width: 360px;
&.hidden {
  transition: transform 0.3s ease, opacity 0.2s ease;
  opacity: 0;
  z-index: -1000;
  transform: scale(0.96) translate(-50%, -46%);
} 
}
`

export default class CharacterFight extends Component {
    state = {
        showHealModal: false,
        showHitModal: false,
        showEndModal: false,
        newHpaction: {
            diff: '',
            diff_type: '',
            source: ''
        },
        diffError: false,
        diffTypeError: false,
        healsourceError: false
    }

    setDefaultHeal = () => {
        const newHpaction = { ...this.state.newHpaction }
        newHpaction.diff_type = 'Healing'
        this.setState({ newHpaction })
    }

    showHealModal = () => {
        this.setState({ showHealModal: !this.state.showHealModal })
        this.setDefaultHeal()
    }

    hideHealModal = () => {
        this.setState({
            showHealModal: false,
            newHpaction: {
                diff: '',
                diff_type: '',
                source: ''
            },
            diffError: false, 
            healsourceError: false
        })
        this.healOpacityChange()
    }

    showHitModal = () => {
        this.setState({ showHitModal: !this.state.showHitModal })
    }

    hideHitModal = () => {
        this.setState({
            showHitModal: false,
            newHpaction: {
                diff: '',
                diff_type: '',
                source: ''
            },
            diffError: false,
            diffTypeError: false
        })
        this.hitOpacityChange()
    }

    showEndModal = () => {
        this.setState({ showEndModal: true })
    }

    hideEndModal = () => {
        this.setState({ showEndModal: false })
    }

    endFight = () => {
        this.hideEndModal()
        this.props.toggleInfo()
        this.props.resetEncounter()
    }

    handleChange = (event) => {
        const newHpaction = { ...this.state.newHpaction }
        newHpaction[event.target.name] = event.target.value
        this.setState({ newHpaction })
    }

    changeHitType = async (event) => {
        const newHpaction = { ...this.state.newHpaction }
        newHpaction['diff_type'] = event.target.id
        await this.setState({ newHpaction })
        this.hitOpacityChange()
    }

    hitOpacityChange = async () => {
        const divs = await document.getElementsByClassName('damage')
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].id === this.state.newHpaction.diff_type) {
                divs[i].classList.add('selected')
            } else {
                divs[i].classList.remove('selected')
            }
        }
    }

    healOpacityChange = async () => {
        const divs = await document.getElementsByClassName('healsource')
        for (let i = 0; i < divs.length; i++) {
            if (divs[i].id === this.state.newHpaction.source) {
                divs[i].classList.add('selected')
            } else {
                divs[i].classList.remove('selected')
            }
        }
    }

    changeHealType = async (event) => {
        const newHpaction = { ...this.state.newHpaction }
        newHpaction['source'] = event.target.id
        await this.setState({ newHpaction })
        this.healOpacityChange()
    }

    handleHealSubmit = async (event) => {
        event.preventDefault()
        if (this.state.newHpaction.diff
            && this.state.newHpaction.source
            ) {
            this.setState({ diffError: false, healsourceError: false })
            const hpaction = await axios.post(`/api/encounters/${this.props.encounter.id}/hpactions`, this.state.newHpaction)
            await axios.put(`/api/characters/${this.props.character.id}`, { current_hp: (this.props.character.current_hp + hpaction.data.diff) })
            await this.props.getCharacter()
            this.setState({
                newHpaction: {
                    diff: '',
                    diff_type: '',
                    source: ''
                },
                showHealModal: false
            })
            this.healOpacityChange()
        } else if (!this.state.newHpaction.diff) {
            this.setState({ diffError: true })
        } else if (!this.state.newHpaction.source) {
            this.setState({ diffError: false, healsourceError: true })
        }
    }

    handleHitSubmit = async (event) => {
        event.preventDefault()
        if (this.state.newHpaction.diff
            && this.state.newHpaction.diff_type) {
            this.setState({ diffError: false, diffTypeError: false, showHitModal: false })
            await this.makeDiffNegative()
            const hpaction = await axios.post(`/api/encounters/${this.props.encounter.id}/hpactions`, this.state.newHpaction)
            await axios.put(`/api/characters/${this.props.character.id}`, { current_hp: (this.props.character.current_hp + hpaction.data.diff) })
            await this.props.getCharacter()
            this.setState({
                newHpaction: {
                    diff: '',
                    diff_type: '',
                    source: ''
                }
            })
            this.hitOpacityChange()
        } else if (!this.state.newHpaction.diff) {
            this.setState({ diffError: true })
        } else if (!this.state.newHpaction.diff_type) {
            this.setState({ diffError: false, diffTypeError: true })
        }
    }

    makeDiffNegative = async () => {
        const newHpaction = { ...this.state.newHpaction }
        newHpaction.diff = 0 - newHpaction.diff
        await this.setState({ newHpaction })
    }

    render() {
        const character = this.props.character

        return (
            <div>
                <img src={this.props.classImg} alt='classpic' />
                <div>
                    <h3>Encounter #{this.props.encounter.id}</h3>
                    <button onClick={this.showEndModal}>End Fight</button>
                    <span><h1>HP: {character.current_hp}</h1> / {character.max_hp} </span>
                </div>
                <div>
                    <button onClick={this.showHealModal}>Heal</button>
                    <button onClick={this.showHitModal}>Take Hit</button>
                </div>

                {/* ---------------- End Fight Modal ---------------- */}
                <StyledModalGroup>
                    <div id='modal' className={this.state.showEndModal ? '' : 'hidden'}>
                        <p>Are you sure you want to end this fight?</p>
                        <div>
                            <button onClick={this.hideEndModal}>Cancel</button>
                            <button id='end' onClick={this.endFight} >Confirm</button>
                        </div>
                    </div>
                    <div id='overlay' onClick={this.hideEndModal} className={this.state.showEndModal ? '' : 'hidden'}></div>
                </StyledModalGroup>

                {/* ---------------- Heal Modal ---------------- */}
                <StyledModalGroup>
                    <div id='modal' className={this.state.showHealModal ? '' : 'hidden'}>
                        <div>
                            <span>+</span>
                            <input type='number' name='diff' value={this.state.newHpaction.diff} onChange={this.handleChange} />
                            <span>HP</span>
                        </div>
                        <h6 className={this.state.diffError ? '' : 'no-error'} >Heal amount cannot be less than zero.</h6>
                        <h6 className={this.state.healsourceError ? '' : 'no-error'} >Heal type must be chosen.</h6>
                        <div className="type-group">
                            <div className="healsource" onClick={this.changeHealType} id='Spell' >
                                <img id='Spell' src='https://66.media.tumblr.com/3125e0c0bb2897858b9eef270385bb9b/tumblr_phw59yBB8J1uj0ljmo2_1280.png' alt='spell' />
                                <h6 id='Spell' >Spell</h6>
                            </div>
                            <div className="healsource" onClick={this.changeHealType} id='Potion' >
                                <img id='Potion' src='https://66.media.tumblr.com/c6776567a92c68365fa0c92e7886f04b/tumblr_phw59yBB8J1uj0ljmo1_1280.png' alt='potion' />
                                <h6 id='Potion' >Potion</h6>
                            </div>
                        </div>
                        <div>
                            <button onClick={this.hideHealModal}>Cancel</button>
                            <input type='submit' id='heal' value='Confirm' onClick={this.handleHealSubmit} />
                        </div>
                    </div>
                    <div id='overlay' onClick={this.hideHealModal} className={this.state.showHealModal ? '' : 'hidden'} ></div>
                </StyledModalGroup>

                {/* ---------------- Hit Modal ---------------- */}
                <StyledModalGroup>
                    <div id='modal' className={this.state.showHitModal ? '' : 'hidden'}>
                        <div>
                            <span>-</span>
                            <input type='number' name='diff' value={this.state.newHpaction.diff} onChange={this.handleChange} />
                            <span>HP</span>
                        </div>
                        <h6 className={this.state.diffError ? '' : 'no-error'} >Hit amount cannot be less than zero.</h6>
                        <p>Damage Type:</p>
                        <h6 className={this.state.diffTypeError ? '' : 'no-error'} >Damage type must be chosen.</h6>
                        <div className="type-group">
                            <div className="damage" onClick={this.changeHitType} id='Acid' >
                                <img id='Acid' src='https://66.media.tumblr.com/c8cb57bf0209cb27cf0a171ea7568498/tumblr_phvqz6OWAt1uj0ljmo1_1280.png' alt='acid' />
                                <h6 id='Acid' >Acid</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Bludgeoning' >
                                <img id='Bludgeoning' src='https://66.media.tumblr.com/2e45330eda93ee9d72c041fc1246b6a3/tumblr_phvqz6OWAt1uj0ljmo10_1280.png' alt='bludgeoning' />
                                <h6 id='Bludgeoning' >Bludgeoning</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Cold' >
                                <img id='Cold' src='https://66.media.tumblr.com/7c7aaf0a22e6caa66b0e71b38a17d2c3/tumblr_phvqz6OWAt1uj0ljmo9_1280.png' alt='cold' />
                                <h6 id='Cold' >Cold</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Fire' >
                                <img id='Fire' src='https://66.media.tumblr.com/00897d655c05a5c5c7ceb8d9cb6510c0/tumblr_phvqz6OWAt1uj0ljmo8_1280.png' alt='fire' />
                                <h6 id='Fire' >Fire</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Force' >
                                <img id='Force' src='https://66.media.tumblr.com/11e6993ea52a01404951fb335b143df6/tumblr_phvqz6OWAt1uj0ljmo6_1280.png' alt='force' />
                                <h6 id='Force' >Force</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Lightning' >
                                <img id='Lightning' src='https://66.media.tumblr.com/1bf6daa4a53f77b744b50b9a8e739a67/tumblr_phvru8Kx321uj0ljmo1_1280.png' alt='lightning' />
                                <h6 id='Lightning' >Lightning</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Necrotic' >
                                <img id='Necrotic' src='https://66.media.tumblr.com/7485bf3a1d508078769a58b285dfd2c6/tumblr_phvru8Kx321uj0ljmo2_1280.png' alt='necrotic' />
                                <h6 id='Necrotic' >Necrotic</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Piercing' >
                                <img id='Piercing' src='https://66.media.tumblr.com/20972979bbe70d7b349ee9edd3bfd332/tumblr_phvqz6OWAt1uj0ljmo2_1280.png' alt='piercing' />
                                <h6 id='Piercing' >Piercing</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Poison' >
                                <img id='Poison' src='https://66.media.tumblr.com/e22eea1d9a065bd353ecd507dbc75d28/tumblr_phvru8Kx321uj0ljmo3_1280.png' alt='poison' />
                                <h6 id='Poison' >Poison</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Psychic' >
                                <img id='Psychic' src='https://66.media.tumblr.com/a342aa97b50fbec2d69dac9f00c37d61/tumblr_phvqz6OWAt1uj0ljmo5_1280.png' alt='psychic' />
                                <h6 id='Psychic' >Psychic</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Radiant' >
                                <img id='Radiant' src='https://66.media.tumblr.com/e0d3b07caaafd2449dd0edb8291b29f5/tumblr_phvqz6OWAt1uj0ljmo7_1280.png' alt='radiant' />
                                <h6 id='Radiant' >Radiant</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Slashing' >
                                <img id='Slashing' src='https://66.media.tumblr.com/5895488b8b4a02996783b75a44f6174a/tumblr_phvqz6OWAt1uj0ljmo3_1280.png' alt='slashing' />
                                <h6 id='Slashing' >Slashing</h6>
                            </div>
                            <div className="damage" onClick={this.changeHitType} id='Thunder' >
                                <img id='Thunder' src='https://66.media.tumblr.com/55495cc27d2e7af0ef5bbd103a580d30/tumblr_phvqz6OWAt1uj0ljmo4_1280.png' alt='thunder' />
                                <h6 id='Thunder' >Thunder</h6>
                            </div>
                        </div>
                        <div>
                            <p>Source: (ie. "Broadsword" or "Thunderwave")</p>
                            <input type='text' name='source' value={this.state.newHpaction.source} onChange={this.handleChange} />
                        </div>
                        <div>
                            <button onClick={this.hideHitModal}>Cancel</button>
                            <button id='hit' onClick={this.handleHitSubmit} >Confirm</button>
                        </div>
                    </div>
                    <div id='overlay' onClick={this.hideHitModal} className={this.state.showHitModal ? '' : 'hidden'} ></div>
                </StyledModalGroup>

                {/* ---------------- Hit Modal ---------------- */}
                <StyledModalGroup>
                    <div id='modal' className={this.props.fightMode ? 'hidden' : ''}>
                        <p>You need to enter a fight to use this screen!</p>
                        <div>
                            <button onClick={this.props.toggleInfo}>Go Back</button>
                        </div>
                    </div>
                    <div id='overlay' onClick={this.hideEndModal} className={this.props.fightMode ? 'hidden' : ''}></div>
                </StyledModalGroup>

            </div>
        )
    }
}