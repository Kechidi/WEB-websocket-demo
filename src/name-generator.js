/**
 * @author Yoann Pigné <yoann.pigne@univ-lehavre.fr>
 * @since 2017-11-18
 * 
 * Génère des noms avec adjectifs aléatoires dans le style des noms de distributions Ubuntu.
 */
import isDef from './is-def'

var prenoms = ['Emma', 'Liam', 'Ava', 'Noah', 'Sophia', 'Oliver', 'Isabella', 'Elijah', 'Charlotte', 'William'];
var nomsDeFamille = ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau'];

export default (random) => {
    random = isDef(random) ? random : Math.random;
    return  nomsDeFamille[Math.floor(Math.random() * nomsDeFamille.length)]
        + ' '
        + prenoms[Math.floor(Math.random() * prenoms.length)];
}