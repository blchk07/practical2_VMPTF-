import { useState } from "react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Купити продукти",
    description: "Хліб, молоко, яйця",
    completed: false,
  },
  {
    id: 2,
    title: "Зробити пз",
    description: "Підготувати пз №2 по ВМПТФ",
    completed: true,
  },
  {
    id: 3,
    title: "Піти в басейн",
    description: "Тренування о 19:00",
    completed: false,
  },
  {
    id: 4,
    title: "Прибрати кімнату",
    description: "Пропилососити та витерти пил",
    completed: true,
  },
  {
    id: 5,
    title: "Зробити презентацію",
    description: "Зробити презентацію по філософії",
    completed: false,
  },
];

function App() {
  const [tasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [sortType, setSortType] = useState("default");

  let visibleTasks = [...tasks];

  if (statusFilter === "completed") {
    visibleTasks = visibleTasks.filter((task) => task.completed);
  }

  if (statusFilter === "active") {
    visibleTasks = visibleTasks.filter((task) => !task.completed);
  }

  visibleTasks = visibleTasks.filter((task) =>
    task.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (sortType === "title") {
    visibleTasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortType === "status") {
    visibleTasks.sort((a, b) => Number(a.completed) - Number(b.completed));
  }

  return (
    <main className="tasks">
      <h1 className="tasks__title">Список завдань</h1>

      <section className="tasks__controls">
        <div className="tasks__control">
          <label className="tasks__label">Пошук</label>
          <input className="tasks__input" type="text" placeholder="Введіть назву задачі" value={searchValue} onChange={(event) => setSearchValue(event.target.value)}/>
        </div>

        <div className="tasks__control">
          <label className="tasks__label">Фільтр за статусом</label>
          <select className="tasks__select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">Всі</option>
            <option value="completed">Завершені</option>
            <option value="active">Незавершені</option>
          </select>
        </div>

        <div className="tasks__control">
          <label className="tasks__label">Сортування</label>
          <select className="tasks__select" value={sortType} onChange={(event) => setSortType(event.target.value)}>
            <option value="default">Без сортування</option>
            <option value="title">За назвою</option>
            <option value="status">За статусом</option>
          </select>
        </div>
      </section>

      <section className="tasks__list">
        {visibleTasks.length > 0 ? (
          visibleTasks.map((task) => (
            <article className="tasks__item" key={task.id}>
              <h2 className="tasks__item-title">{task.title}</h2>
              <p className="tasks__item-text">{task.description}</p>

              <span
                className={task.completed ? "tasks__status tasks__status--completed" : "tasks__status tasks__status--active" }
              >
                {task.completed ? "Завершено" : "Незавершено"}
              </span>
            </article>
          ))
        ) : (
          <p className="tasks__empty">Завдань не знайдено</p>
        )}
      </section>
    </main>
  );
}

export default App;