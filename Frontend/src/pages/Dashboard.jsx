import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  CircleUserRound,
  ListTodo,
  Plus,
  Trash2,
  Trash2Icon,
} from "lucide-react";
import api from "../api/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const handleInfo = async () => {
    try {
      const res = await api.get("/auth/me");
      setUserInfo({
        name: res.data?.name || "",
        email: res.data?.email || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/todos");
      setTodos(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;

    await api.post("/todos", { title });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await api.put(`/todos/${todo._id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  useEffect(() => {
    handleInfo();
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="shrink-0">
                  <CircleUserRound className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-72 max-w-[calc(100vw-2rem)]"
              >
                <PopoverHeader className="gap-2">
                  <PopoverTitle className="text-base uppercase">
                   Name : {userInfo.name || "Not available"}
                  </PopoverTitle>
                  <p className=" text-sm text-base">
                   Email: {userInfo.email || "Not available"}
                  </p>
                </PopoverHeader>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="mt-3 w-full">
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Are you logging out?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will log you out of your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel variant="outline">
                        Stay
                      </AlertDialogCancel>
                      <AlertDialogAction variant="destructive" onClick={logout}>
                        Leave
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:justify-start">
            <HoverCard openDelay={10} closeDelay={100}>
              <HoverCardTrigger asChild className="cursor-pointer text-xl">
                <Button variant="link" className="h-auto px-0 text-left">
                  <span className="flex items-center gap-2 text-lg sm:text-xl">
                    <ListTodo className="h-5 w-5" />
                    <strong>2do App</strong>
                  </span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="flex w-64 max-w-[calc(100vw-2rem)] flex-col gap-0.5">
                <div>
                  Developer <strong>Adharsh Kumar Singh</strong>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Know me better -{" "}
                  <a
                    href="https://adrsh.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Portfolio
                  </a>
                </div>
              </HoverCardContent>
            </HoverCard>

            
          </div>
          
          <div className=" grid gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-white sm:grid-cols-2 sm:items-center lg:min-w-[340px]">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
                Welcome
              </p>
              <p className="truncate text-sm uppercase font-medium sm:text-base">
                {userInfo.name || "Your workspace"}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
                Tasks
              </p>
              <p className="text-sm font-medium sm:text-base">
                {todos.length} total items
              </p>
            </div>
          </div>
        </div>
        
      </div>
      

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:px-8 lg:py-8">
        <div>
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Task Composer
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Stay on top of what matters.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <label
              htmlFor="todo-title"
              className="text-sm font-medium text-slate-700"
            >
              Add a new task
            </label>
            <div className="flex flex-col gap-1 sm:flex-row">
              <input
                id="todo-title"
                className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                placeholder="Add new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button
                className="h-11 rounded-xl px-1 sm:min-w-12"
                onClick={addTodo}
              >
                <Plus className=" h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
                Completed
              </p>
              <p className="mt-2 text-2xl font-semibold">{completedCount}</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-4 text-slate-900">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Pending
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{pendingCount}</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-slate-500" />
              </div>
            </div>
          </div>
        </section>
</div>
        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                Your List
              </p>
              <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Today&apos;s tasks
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Tap a checkbox to mark a task complete.
            </p>
          </div>

          <div className="min-h-[320px] space-y-3">
            {loading ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center text-sm text-slate-500">
                Loading your tasks...
              </div>
            ) : todos.length === 0 ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
                <ListTodo className="mb-3 h-8 w-8 text-slate-400" />
                <p className="text-base font-medium text-slate-700">
                  No tasks yet
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Add your first task from the panel on the left and it will
                  appear here.
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <label className="flex min-w-0 items-start gap-3 sm:items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                      className="mt-1 h-4 w-4 shrink-0 sm:mt-0"
                    />
                    <span
                      className={`break-words text-sm sm:text-base ${
                        todo.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-800"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </label>

                  <Button
                    variant="ghost"
                    className="h-10 justify-center rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-auto"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
