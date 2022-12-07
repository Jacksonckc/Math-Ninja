import { Howl } from "howler";
import mainSound from "../game_src/assets/mainSound.mp3";
import bladeSound from "../game_src/assets/bladeSound.mp3";
import correctAnswer from "../game_src/assets/correctAnswer.mp3";
import gameOver from "../game_src/assets/gameOver.mp3";
import wrongAnswer from "../game_src/assets/wrongAnswer.mp3";

export class SoundHandler {
  // Play Main Sound
  playMainSound() {
    const sound = new Howl({
      src: mainSound,
      html5: true,
      loop: true,
      volume: 0.1,
    });
    // Is this the most efficient way? Refactor this in the future.
    return [sound.play(), sound];
  }

  // Mute Main Sound
  muteMainSound(isMuted, id, sound) {
    if (isMuted) {
      sound.mute(false, id);
    } else {
      sound.mute(true, id);
    }
  }

  // Slice Sound
  playSoundSlice(isGameActive) {
    const sound = new Howl({
      src: bladeSound,
      html5: true,
      volume: 0.6,
    });
    if (isGameActive) {
      sound.play();
    }
  }

  // Correct Answer
  playCorrectAnswer() {
    const sound = new Howl({
      src: correctAnswer,
      html5: true,
      volume: 0.8,
    });
    sound.play();
  }

  // Wrong Answer
  playWrongAnswer() {
    const sound = new Howl({
      src: wrongAnswer,
      html5: true,
      volume: 0.8,
    });
    sound.play();
  }

  // Game Over
  playGameOver() {
    const sound = new Howl({
      src: gameOver,
      html5: true,
      volume: 0.5,
    });
    sound.play();
  }
}
