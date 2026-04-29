import { useMemo, useState } from "react";
import "./App.css";

// ИКОНКИ КАТЕГОРИЙ
import dishesIcon from "./assets/categories/dishes.png";
import clothesIcon from "./assets/categories/clothes.png";
import techIcon from "./assets/categories/tech.png";
import fruitsIcon from "./assets/categories/fruits.png";
import animalsIcon from "./assets/categories/animals.png";
import furnitureIcon from "./assets/categories/furniture.png";
import vegetablesIcon from "./assets/categories/vegetables.png";
import berriesIcon from "./assets/categories/berries.png";

// ПОСУДА
import tarelkaImg from "./assets/dishes/tarelka.png";
import lozhkaImg from "./assets/dishes/lozhka.png";
import vilkaImg from "./assets/dishes/vilka.png";
import nozhImg from "./assets/dishes/nozh.png";
import kruzhkaImg from "./assets/dishes/kruzhka.png";
import kastryulyaImg from "./assets/dishes/kastryulya.png";
import skovorodkaImg from "./assets/dishes/skovorodka.png";
import lopatkaImg from "./assets/dishes/lopatka.png";
import blyudtseImg from "./assets/dishes/blyudtse.png";
import povaryoshkaImg from "./assets/dishes/povaryoshka.png";

// ОДЕЖДА
import tshirtImg from "./assets/clothes/tshirt.png";
import shortsImg from "./assets/clothes/shorts.png";
import sweaterImg from "./assets/clothes/sweater.png";
import pantsImg from "./assets/clothes/pants.png";
import skirtImg from "./assets/clothes/skirt.png";
import dressImg from "./assets/clothes/dress.png";
import jacketImg from "./assets/clothes/jacket.png";
import shirtImg from "./assets/clothes/shirt.png";
import socksImg from "./assets/clothes/socks.png";
import tanktopImg from "./assets/clothes/tanktop.png";

// ТЕХНИКА
import washingImg from "./assets/tech/washing.png";
import fridgeImg from "./assets/tech/refrigerator.png";
import kettleImg from "./assets/tech/electric kettle.png";
import microwaveImg from "./assets/tech/microwave.png";
import vacuumImg from "./assets/tech/vacuum.png";
import tvImg from "./assets/tech/tv.png";
import ironImg from "./assets/tech/iron.png";
import hairdryerImg from "./assets/tech/hair dryer.png";
import conditionerImg from "./assets/tech/air.png";
import mixerImg from "./assets/tech/hand.png";

// ФРУКТЫ
import appleImg from "./assets/fruits/apple.png";
import pearImg from "./assets/fruits/pear.png";
import orangeImg from "./assets/fruits/orange.png";
import bananaImg from "./assets/fruits/banana.png";
import peachImg from "./assets/fruits/peach.png";
import pineappleImg from "./assets/fruits/pineapple.png";
import kiwiImg from "./assets/fruits/kiwi.png";
import melonImg from "./assets/fruits/melon.png";
import watermelonImg from "./assets/fruits/watermelon.png";
import lemonImg from "./assets/fruits/lemon.png";

// ДОМАШНИЕ ЖИВОТНЫЕ
import catImg from "./assets/animals/cat.png";
import chickenImg from "./assets/animals/chicken.png";
import cowImg from "./assets/animals/cow.png";
import dogImg from "./assets/animals/dog.png";
import goatImg from "./assets/animals/goat.png";
import pigImg from "./assets/animals/pig.png";
import rabbitImg from "./assets/animals/rabbit.png";
import ramImg from "./assets/animals/ram.png";
import roosterImg from "./assets/animals/rooster.png";
import sheepImg from "./assets/animals/sheep.png";

// МЕБЕЛЬ
import armchairImg from "./assets/furniture/armchair.png";
import bedImg from "./assets/furniture/bed.png";
import chairImg from "./assets/furniture/chair.png";
import dresserImg from "./assets/furniture/dresser.png";
import lampImg from "./assets/furniture/lamp.png";
import nightstandImg from "./assets/furniture/nightstand.png";
import shelfImg from "./assets/furniture/shelf.png";
import sofaImg from "./assets/furniture/sofa.png";
import tableImg from "./assets/furniture/table.png";
import wardrobeImg from "./assets/furniture/wardrobe.png";

// ОВОЩИ
import beetrootImg from "./assets/vegetables/beetroot.png";
import bellpepperImg from "./assets/vegetables/bellpepper.png";
import cabbageImg from "./assets/vegetables/cabbage.png";
import carrotImg from "./assets/vegetables/carrot.png";
import cucumberImg from "./assets/vegetables/cucumber.png";
import eggplantImg from "./assets/vegetables/eggplant.png";
import garlicbulbImg from "./assets/vegetables/garlicbulb.png";
import onionImg from "./assets/vegetables/onion.png";
import potatoImg from "./assets/vegetables/potato.png";
import tomatoImg from "./assets/vegetables/tomato.png";

// ЯГОДЫ
import blackberryImg from "./assets/berries/blackberry.png";
import blueberryImg from "./assets/berries/blueberry.png";
import currantberriesImg from "./assets/berries/currantberries.png";
import gooseberriesImg from "./assets/berries/gooseberries.png";
import lingonberriesImg from "./assets/berries/lingonberries.png";
import raspberryImg from "./assets/berries/raspberry.png";
import seabuckthornImg from "./assets/berries/seabuckthorn.png";
import strawberryImg from "./assets/berries/strawberry.png";
import withstemImg from "./assets/berries/withstem.png";

// АУДИО ФРУКТЫ
import appleAudio from "./assets/audio/fruits/apple.mp3";
import pearAudio from "./assets/audio/fruits/pear.mp3";
import orangeAudio from "./assets/audio/fruits/orange.mp3";
import bananaAudio from "./assets/audio/fruits/banana.mp3";
import peachAudio from "./assets/audio/fruits/peach.mp3";
import pineappleAudio from "./assets/audio/fruits/pineapple.mp3";
import kiwiAudio from "./assets/audio/fruits/kiwi.mp3";
import melonAudio from "./assets/audio/fruits/melon.mp3";
import watermelonAudio from "./assets/audio/fruits/watermelon.mp3";
import lemonAudio from "./assets/audio/fruits/lemon.mp3";

// АУДИО БЫТОВАЯ ТЕХНИКА
import washingAudio from "./assets/audio/tech/washing.mp3";
import fridgeAudio from "./assets/audio/tech/refrigerator.mp3";
import kettleAudio from "./assets/audio/tech/kettle.mp3";
import microwaveAudio from "./assets/audio/tech/microwave.mp3";
import vacuumAudio from "./assets/audio/tech/vacuum.mp3";
import tvAudio from "./assets/audio/tech/tv.mp3";
import ironAudio from "./assets/audio/tech/iron.mp3";
import hairdryerAudio from "./assets/audio/tech/hairdryer.mp3";
import conditionerAudio from "./assets/audio/tech/air.mp3";
import mixerAudio from "./assets/audio/tech/hand.mp3";

// АУДИО ДОМАШНИЕЕ ЖИВОТНЫЕ
import catAudio from "./assets/audio/animals/cat.mp3";
import chickenAudio from "./assets/audio/animals/chicken.mp3";
import cowAudio from "./assets/audio/animals/cow.mp3";
import dogAudio from "./assets/audio/animals/dog.mp3";
import goatAudio from "./assets/audio/animals/goat.mp3";
import pigAudio from "./assets/audio/animals/pig.mp3";
import rabbitAudio from "./assets/audio/animals/rabbit.mp3";
import ramAudio from "./assets/audio/animals/ram.mp3";
import roosterAudio from "./assets/audio/animals/rooster.mp3";
import sheepAudio from "./assets/audio/animals/sheep.mp3";

// АУДИО ОДЕЖДА
import tshirtAudio from "./assets/audio/clothes/tshirt.mp3";
import shortsAudio from "./assets/audio/clothes/shorts.mp3";
import sweaterAudio from "./assets/audio/clothes/sweater.mp3";
import pantsAudio from "./assets/audio/clothes/pants.mp3";
import skirtAudio from "./assets/audio/clothes/skirt.mp3";
import dressAudio from "./assets/audio/clothes/dress.mp3";
import jacketAudio from "./assets/audio/clothes/jacket.mp3";
import shirtAudio from "./assets/audio/clothes/shirt.mp3";
import socksAudio from "./assets/audio/clothes/socks.mp3";
import tanktopAudio from "./assets/audio/clothes/tanktop.mp3";

// АУДИО ПОСУДА
import tarelkaAudio from "./assets/audio/dishes/tarelka.mp3";
import lozhkaAudio from "./assets/audio/dishes/lozhka.mp3";
import vilkaAudio from "./assets/audio/dishes/vilka.mp3";
import nozhAudio from "./assets/audio/dishes/nozh.mp3";
import kruzhkaAudio from "./assets/audio/dishes/kruzhka.mp3";
import kastryulyaAudio from "./assets/audio/dishes/kastryulya.mp3";
import skovorodkaAudio from "./assets/audio/dishes/skovorodka.mp3";
import lopatkaAudio from "./assets/audio/dishes/lopatka.mp3";
import blyudtseAudio from "./assets/audio/dishes/blyudtse.mp3";
import povaryoshkaAudio from "./assets/audio/dishes/povaryoshka.mp3";

const dishesAudioMap = {
  tarelka: tarelkaAudio,
  lozhka: lozhkaAudio,
  vilka: vilkaAudio,
  nozh: nozhAudio,
  kruzhka: kruzhkaAudio,
  kastryulya: kastryulyaAudio,
  skovorodka: skovorodkaAudio,
  lopatka: lopatkaAudio,
  blyudtse: blyudtseAudio,
  povaryoshka: povaryoshkaAudio,
};

const clothesAudioMap = {
  tshirt: tshirtAudio,
  shorts: shortsAudio,
  sweater: sweaterAudio,
  pants: pantsAudio,
  skirt: skirtAudio,
  dress: dressAudio,
  jacket: jacketAudio,
  shirt: shirtAudio,
  socks: socksAudio,
  tanktop: tanktopAudio,
};

const animalsAudioMap = {
  cat: catAudio,
  chicken: chickenAudio,
  cow: cowAudio,
  dog: dogAudio,
  goat: goatAudio,
  pig: pigAudio,
  rabbit: rabbitAudio,
  ram: ramAudio,
  rooster: roosterAudio,
  sheep: sheepAudio,
};

const fruitsAudioMap = {
  apple: appleAudio,
  pear: pearAudio,
  orange: orangeAudio,
  banana: bananaAudio,
  peach: peachAudio,
  pineapple: pineappleAudio,
  kiwi: kiwiAudio,
  melon: melonAudio,
  watermelon: watermelonAudio,
  lemon: lemonAudio,
};

const techAudioMap = {
  washing: washingAudio,
  fridge: fridgeAudio,
  kettle: kettleAudio,
  microwave: microwaveAudio,
  vacuum: vacuumAudio,
  tv: tvAudio,
  iron: ironAudio,
  hairdryer: hairdryerAudio,
  conditioner: conditionerAudio,
  mixer: mixerAudio,
};

const categories = [
  {
    id: "dishes",
    name: "Посуда",
    icon: dishesIcon,
    words: [
      { id: "tarelka", word: "тарелка", image: tarelkaImg },
      { id: "lozhka", word: "ложка", image: lozhkaImg },
      { id: "vilka", word: "вилка", image: vilkaImg},
      { id: "nozh", word: "нож", image: nozhImg},
      { id: "kruzhka", word: "кружка", image: kruzhkaImg },
      { id: "kastryulya", word: "кастрюля", image: kastryulyaImg },
      { id: "skovorodka", word: "сковородка", image: skovorodkaImg},
      { id: "lopatka", word: "лопатка", image: lopatkaImg },
      { id: "blyudtse", word: "блюдце", image: blyudtseImg},
      { id: "povaryoshka", word: "поварёшка", image: povaryoshkaImg },
    ],
  },
  {
    id: "clothes",
    name: "Одежда",
    icon: clothesIcon,
    words: [
      { id: "tshirt", word: "футболка", image: tshirtImg},
      { id: "shorts", word: "шорты", image: shortsImg },
      { id: "sweater", word: "кофта", image: sweaterImg},
      { id: "pants", word: "штаны", image: pantsImg},
      { id: "skirt", word: "юбка", image: skirtImg },
      { id: "dress", word: "платье", image: dressImg },
      { id: "jacket", word: "пиджак", image: jacketImg },
      { id: "shirt", word: "рубашка", image: shirtImg },
      { id: "socks", word: "носки", image: socksImg },
      { id: "tanktop", word: "майка", image: tanktopImg },
    ],
  },
  {
    id: "tech",
    name: "Бытовая техника",
    icon: techIcon,
    words: [
      { id: "washing", word: "стиральная машина", image: washingImg },
      { id: "fridge", word: "холодильник", image: fridgeImg },
      { id: "kettle", word: "чайник", image: kettleImg },
      { id: "microwave", word: "микроволновка", image: microwaveImg },
      { id: "vacuum", word: "пылесос", image: vacuumImg },
      { id: "tv", word: "телевизор", image: tvImg},
      { id: "iron", word: "утюг", image: ironImg },
      { id: "hairdryer", word: "фен", image: hairdryerImg },
      { id: "conditioner", word: "кондиционер", image: conditionerImg },
      { id: "mixer", word: "миксер", image: mixerImg },
    ],
  },
  {
    id: "fruits",
    name: "Фрукты",
    icon: fruitsIcon,
    words: [
      { id: "apple", word: "яблоко", image: appleImg },
      { id: "pear", word: "груша", image: pearImg },
      { id: "orange", word: "апельсин", image: orangeImg },
      { id: "banana", word: "банан", image: bananaImg },
      { id: "peach", word: "персик", image: peachImg },
      { id: "pineapple", word: "ананас", image: pineappleImg },
      { id: "kiwi", word: "киви", image: kiwiImg },
      { id: "melon", word: "дыня", image: melonImg },
      { id: "watermelon", word: "арбуз", image: watermelonImg },
      { id: "lemon", word: "лимон", image: lemonImg },
    ],
  },
  {
  id: "animals",
  name: "Домашние животные",
  icon: animalsIcon,
  words: [
    { id: "cat", word: "кошка", image: catImg },
    { id: "chicken", word: "курица", image: chickenImg },
    { id: "cow", word: "корова", image: cowImg },
    { id: "dog", word: "собака", image: dogImg },
    { id: "goat", word: "коза", image: goatImg },
    { id: "pig", word: "свинья", image: pigImg },
    { id: "rabbit", word: "кролик", image: rabbitImg },
    { id: "ram", word: "баран", image: ramImg },
    { id: "rooster", word: "петух", image: roosterImg },
    { id: "sheep", word: "овца", image: sheepImg },
  ],
},
{
  id: "furniture",
  name: "Мебель",
  icon: furnitureIcon,
  words: [
    { id: "armchair", word: "кресло", image: armchairImg },
    { id: "bed", word: "кровать", image: bedImg },
    { id: "chair", word: "стул", image: chairImg },
    { id: "dresser", word: "комод", image: dresserImg },
    { id: "lamp", word: "лампа", image: lampImg },
    { id: "nightstand", word: "тумбочка", image: nightstandImg },
    { id: "shelf", word: "полка", image: shelfImg },
    { id: "sofa", word: "диван", image: sofaImg },
    { id: "table", word: "стол", image: tableImg },
    { id: "wardrobe", word: "шкаф", image: wardrobeImg },
  ],
},
{
  id: "vegetables",
  name: "Овощи",
  icon: vegetablesIcon,
  words: [
    { id: "beetroot", word: "свёкла", image: beetrootImg },
    { id: "bellpepper", word: "перец", image: bellpepperImg },
    { id: "cabbage", word: "капуста", image: cabbageImg },
    { id: "carrot", word: "морковь", image: carrotImg },
    { id: "cucumber", word: "огурец", image: cucumberImg },
    { id: "eggplant", word: "баклажан", image: eggplantImg },
    { id: "garlicbulb", word: "чеснок", image: garlicbulbImg },
    { id: "onion", word: "лук", image: onionImg },
    { id: "potato", word: "картофель", image: potatoImg },
    { id: "tomato", word: "помидор", image: tomatoImg },
  ],
},
{
  id: "berries",
  name: "Ягоды",
  icon: berriesIcon,
  words: [
    { id: "blackberry", word: "ежевика", image: blackberryImg },
    { id: "blueberry", word: "черника", image: blueberryImg },
    { id: "currantberries", word: "смородина", image: currantberriesImg },
    { id: "gooseberries", word: "крыжовник", image: gooseberriesImg },
    { id: "lingonberries", word: "брусника", image: lingonberriesImg },
    { id: "raspberry", word: "малина", image: raspberryImg },
    { id: "seabuckthorn", word: "облепиха", image: seabuckthornImg },
    { id: "strawberry", word: "клубника", image: strawberryImg },
    { id: "withstem", word: "вишня", image: withstemImg },
  ],
},
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function speak(wordItem, category) {
  const audioMaps = {
    fruits: fruitsAudioMap,
    tech: techAudioMap,
    animals: animalsAudioMap,
    clothes: clothesAudioMap,
    dishes: dishesAudioMap,
  };

  const categoryMap = audioMaps[category?.id];

  if (categoryMap) {
    const audioSrc = categoryMap[wordItem.id];
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
      return;
    }
  }

  const utterance = new SpeechSynthesisUtterance(wordItem.word);
  utterance.lang = "ru-RU";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [level, setLevel] = useState(null);

  const [exerciseWords, setExerciseWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const [activeWord, setActiveWord] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  const [wrongLetterIndex, setWrongLetterIndex] = useState(null);

  const [matchedIds, setMatchedIds] = useState([]);
  const [wrongPairImageId, setWrongPairImageId] = useState(null);
  const [matchedWordIds, setMatchedWordIds] = useState([]);
  const [wrongLevel2ImageId, setWrongLevel2ImageId] = useState(null);
  const [wrongLevel2WordId, setWrongLevel2WordId] = useState(null);

  const [answer, setAnswer] = useState([]);
  const [usedLetterIndexes, setUsedLetterIndexes] = useState([]);

  const currentItem = exerciseWords[currentIndex];

  const imageOptions = useMemo(() => {
    if (!selectedCategory) return [];
    return shuffleArray(selectedCategory.words);
  }, [selectedCategory]);

  const letterOptions = useMemo(() => {
    if (!currentItem) return [];
    return shuffleArray(
      currentItem.word.split("").map((letter, index) => ({
        letter,
        originalIndex: index,
        id: `${letter}-${index}`,
      }))
    );
  }, [currentItem]);

  function startExercise(category, levelValue) {
    setSelectedCategory(category);
    setLevel(levelValue);
    setExerciseWords(shuffleArray(category.words));
    setCurrentIndex(0);
    setFinished(false);
    setActiveWord(null);
    setSelectedWord(null);
    setWrongLetterIndex(null);
    setAnswer([]);
    setUsedLetterIndexes([]);
    setMatchedIds([]);
    setWrongPairImageId(null);
    setMatchedWordIds([]);
    setWrongLevel2ImageId(null);
    setWrongLevel2WordId(null); 
  }

  function chooseCategory(category) {
    setSelectedCategory(category);
    setLevel(null);
    setFinished(false);
  }

  function backToCategories() {
    setSelectedCategory(null);
    setLevel(null);
    setExerciseWords([]);
    setCurrentIndex(0);
    setFinished(false);
  }

  function backToLevels() {
    setLevel(null);
    setExerciseWords([]);
    setCurrentIndex(0);
    setFinished(false);
    setActiveWord(null);
    setSelectedWord(null);
    setAnswer([]);
    setUsedLetterIndexes([]);
    setMatchedIds([]);
    setWrongPairImageId(null);
    setMatchedWordIds([]);
    setWrongLevel2ImageId(null);
    setWrongLevel2WordId(null);
  }

  function goNext() {
    setActiveWord(null);
    setSelectedWord(null);
    setWrongLetterIndex(null);
    setAnswer([]);
    setUsedLetterIndexes([]);

    if (currentIndex + 1 >= exerciseWords.length) {
      setFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function repeatExercise() {
    if (!selectedCategory || !level) return;

    setExerciseWords(shuffleArray(selectedCategory.words));
    setCurrentIndex(0);
    setFinished(false);
    setActiveWord(null);
    setSelectedWord(null);
    setWrongLetterIndex(null);
    setAnswer([]);
    setUsedLetterIndexes([]);
    setMatchedIds([]);
    setWrongPairImageId(null);
    setMatchedWordIds([]);
    setWrongLevel2ImageId(null);
    setWrongLevel2WordId(null);
  }

  function checkLevel2Pair(imageItem) {
  if (!selectedWord) return;
  if (matchedWordIds.includes(imageItem.id)) return;

  if (imageItem.id === selectedWord.id) {
    setMatchedWordIds([...matchedWordIds, imageItem.id]);
    setSelectedWord(null);

    if (matchedWordIds.length + 1 >= exerciseWords.length) {
      setTimeout(() => setFinished(true), 500);
    }
  } else {
    setWrongLevel2ImageId(imageItem.id);
    setWrongLevel2WordId(selectedWord.id);
    setSelectedWord(null);

    setTimeout(() => {
      setWrongLevel2ImageId(null);
      setWrongLevel2WordId(null);
    }, 5000);
  }
}

  function checkLevel1Pair(imageItem) {
  if (!activeWord) return;
  if (matchedIds.includes(imageItem.id)) return;

  if (imageItem.id === activeWord.id) {
    setMatchedIds([...matchedIds, imageItem.id]);
    setActiveWord(null);

    if (matchedIds.length + 1 >= exerciseWords.length) {
      setTimeout(() => setFinished(true), 500);
    }
  } else {
    setWrongPairImageId(imageItem.id);
    setActiveWord(null);

    setTimeout(() => {
      setWrongPairImageId(null);
    }, 5000);
  }
}

  function addLetter(option, index) {
    if (!currentItem) return;
    if (usedLetterIndexes.includes(index)) return;

    const nextLetter = currentItem.word[answer.length];

    if (option.letter !== nextLetter) {
      setWrongLetterIndex(index);
      setTimeout(() => setWrongLetterIndex(null), 600);
      return;
    }

    const newAnswer = [...answer, option.letter];
    setAnswer(newAnswer);
    setUsedLetterIndexes([...usedLetterIndexes, index]);

    if (newAnswer.join("") === currentItem.word) {
      setTimeout(() => {
        goNext();
      }, 700);
    }
  }

  return (
  <div className="app">
    {!selectedCategory && (
      <>
        <h1>онлайн-тренажёр по восстановлению номинативной функции речи у пациентов с афазией</h1>
        <h2>Выберите категорию для тренировки</h2>
        <p>Занимайтесь ежедневно и улучшайте свою речь</p>

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className="category-card"
              onClick={() => chooseCategory(category)}
            >
              <img src={category.icon} alt={category.name} className="category-icon" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="about">
          <h2>О проекте</h2>
          <p>
            Интерактивный онлайн-тренажёр разработан для поддержки занятий...
          </p>

          <div className="about-grid">
            <div className="about-card">
              <h3>Логопедическая часть</h3>
              <p>Подготовка речевого материала...</p>
              <span>Алина, логопед</span>
            </div>

            <div className="about-card">
              <h3>Техническая реализация</h3>
              <p>Проектирование интерфейса...</p>
              <span>Виктор, разработчик</span>
            </div>
          </div>
        </div>
      </>
    )}

      {selectedCategory && !level && (
  <div className="levels category-screen">
    <button className="back-btn level-back" onClick={backToCategories}>
      ← Назад
    </button>

    <div className="category-header">
      <img
        src={selectedCategory.icon}
        alt={selectedCategory.name}
        className="selected-category-icon"
      />

      <div>
        <h2>{selectedCategory.name}</h2>
        <p>
          Выберите режим тренировки. В категории доступно{" "}
          <b>{selectedCategory.words.length}</b> слов.
        </p>
      </div>
    </div>

    <div className="level-buttons">
      <button onClick={() => startExercise(selectedCategory, 1)}>
        Уровень 1 — слушай и выбирай
      </button>

      <button onClick={() => startExercise(selectedCategory, 2)}>
        Уровень 2 — слово и картинка
      </button>

      <button onClick={() => startExercise(selectedCategory, 3)}>
        Уровень 3 — собери слово
      </button>
    </div>
  </div>
)}

      {finished && (
        <div className="game">
          <h2>Упражнение завершено</h2>
          <p>Все слова в категории пройдены.</p>

          <button className="sound-btn" onClick={repeatExercise}>
            Повторить ещё раз
          </button>

          <button className="back-btn" onClick={backToLevels}>
            Выбрать другой уровень
          </button>

          <button className="back-btn" onClick={backToCategories}>
            К категориям
          </button>
        </div>
      )}

      {selectedCategory && level === 1 && !finished && (
  <div className="game">
    <button className="back-btn" onClick={backToLevels}>
      ← Назад
    </button>

    <h2>Уровень 1</h2>
    <p>Слева нажми звук, справа выбери подходящую картинку.</p>

    <div className="progress">
      Соединено {matchedIds.length} из {exerciseWords.length}
    </div>

    <div className="match-layout">
      <div className="left-column">
        {exerciseWords.map((item) => (
          <button
            key={item.id}
            disabled={matchedIds.includes(item.id)}
            className={
              matchedIds.includes(item.id)
                ? "match-btn matched"
                : activeWord?.id === item.id
                ? "match-btn active"
                : "match-btn"
            }
            onClick={() => {
              if (matchedIds.includes(item.id)) return;
              setActiveWord(item);
              speak(item, selectedCategory);
            }}
          >
            🔊
          </button>
        ))}
      </div>

      <div className="right-column">
        {imageOptions.map((item) => (
          <button
            key={item.id}
            disabled={matchedIds.includes(item.id)}
            className={
              matchedIds.includes(item.id)
                ? "word-card matched"
                : wrongPairImageId === item.id
                ? "word-card wrong"
                : "word-card"
            }
            onClick={() => checkLevel1Pair(item)}
          >
            <img src={item.image} alt={item.word} />
          </button>
        ))}
      </div>
    </div>
  </div>
)}

      {selectedCategory && level === 2 && !finished && (
  <div className="game">
    <button className="back-btn" onClick={backToLevels}>
      ← Назад
    </button>

    <h2>Уровень 2</h2>
    <p>Слева выбери слово, справа выбери подходящую картинку.</p>

    <div className="progress">
      Соединено {matchedWordIds.length} из {exerciseWords.length}
    </div>

    <div className="match-layout">
      <div className="left-column">
        {exerciseWords.map((item) => (
          <button
            key={item.id}
            disabled={matchedWordIds.includes(item.id)}
            className={
              matchedWordIds.includes(item.id)
                ? "match-btn matched"
                : selectedWord?.id === item.id
                ? "match-btn active"
                : wrongLevel2WordId === item.id
                ? "match-btn wrong"
                : "match-btn"
            }
            onClick={() => {
              if (matchedWordIds.includes(item.id)) return;
              setSelectedWord(item);
            }}
          >
            {item.word}
          </button>
        ))}
      </div>

      <div className="right-column">
        {imageOptions.map((item) => (
          <button
            key={item.id}
            disabled={matchedWordIds.includes(item.id)}
            className={
              matchedWordIds.includes(item.id)
                ? "word-card matched"
                : wrongLevel2ImageId === item.id
                ? "word-card wrong"
                : "word-card"
            }
            onClick={() => checkLevel2Pair(item)}
          >
            <img src={item.image} alt={item.word} />
          </button>
        ))}
      </div>
    </div>
  </div>
)}

      {selectedCategory && level === 3 && currentItem && !finished && (
        <div className="game">
          <button className="back-btn" onClick={backToLevels}>
            ← Назад
          </button>

          <h2>Уровень 3</h2>
          <p>Собери слово по картинке. Без озвучки и без подсказки.</p>

          <div className="progress">
            Слово {currentIndex + 1} из {exerciseWords.length}
          </div>

          <div className="task-image-wrap">
            <img src={currentItem.image} alt="" className="task-image" />
          </div>

          <div className="answer-box">
            {currentItem.word.split("").map((_, index) => (
              <span key={index} className="answer-cell">
                {answer[index] || ""}
              </span>
            ))}
          </div>

          <div className="letters">
            {letterOptions.map((option, index) => (
              <button
                key={option.id}
                disabled={usedLetterIndexes.includes(index)}
                className={
                  wrongLetterIndex === index
                    ? "letter-wrong"
                    : usedLetterIndexes.includes(index)
                    ? "letter-used"
                    : ""
                }
                onClick={() => addLetter(option, index)}
              >
                {option.letter}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}