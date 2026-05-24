import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'player-card',
  styleUrl: 'player-card.css',
  shadow: true,
})

export class PlayerCard {

  // ==========================================
  // PROPIEDADES
  // ==========================================

  @Prop() nombre: string = '';

  @Prop() equipo: string = '';

  @Prop() posicion: string = '';

  @Prop() foto: string = '';

  render() {

    return (

      <div class="card">

        <img
          src={this.foto}
          alt={this.nombre}
        />

        <h2>{this.nombre}</h2>

        <p>{this.equipo}</p>

        <span>{this.posicion}</span>

      </div>

    );

  }

}