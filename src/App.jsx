import { useMemo, useState } from "react";
import "./App.css";

// ИКОНКИ КАТЕГОРИЙ
import dishesIcon from "./assets/images/categories/dishes.png";
import clothesIcon from "./assets/images/categories/clothes.png";
import techIcon from "./assets/images/categories/tech.png";
import fruitsIcon from "./assets/images/categories/fruits.png";

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
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
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
      <h1>онлайн-тренажёр по восстановлению номинативной функции речи у пациентов с афазией</h1>

      {!selectedCategory && (
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
      )}
      <div className="project-authors">
  <h2>О проекте</h2>

  <p>
    Интерактивный онлайн-тренажёр разработан для поддержки занятий по восстановлению
    номинативной функции речи у пациентов с афазией.
  </p>

  <div className="authors-grid">
    <div className="author-card">
      <h3>Логопедическая часть</h3>
      <p>
        Подготовка речевого материала, подбор категорий и методическая логика заданий:
      </p>
      <strong>Вика, логопед</strong>
    </div>

    <div className="author-card">
      <h3>Техническая реализация</h3>
      <p>
        Проектирование интерфейса, разработка веб-приложения, логика уровней и публикация сайта:
      </p>
      <strong>Виктор, разработчик</strong>
    </div>
  </div>
</div>

      {selectedCategory && !level && (
        <div className="levels">
          <button className="back-btn" onClick={backToCategories}>
            ← Назад
          </button>

          <h2>{selectedCategory.name}</h2>

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
              speak(item.word);
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