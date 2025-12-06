import { useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  message: string;
};

export default function SearchUser() {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<User[]>([]);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:8080/api/userSort", {
          id: id ? Number(id) : null,
          name: name || null,
          email: email || null,
        },
        {
          withCredentials: true
        }
      );
      // APIからのレスポンスをUser型の配列として扱う
      const users: User[] = res.data;

      // messageを持つユーザーを抽出
      const errorUser = users.find((u) => u.message && u.message.trim() !== "");

      if (errorUser) {
        setMessage(errorUser.message);
        setResult([]); // 結果は表示しない
      } else {
        setMessage("");
        setResult(users);
      }
    } catch (e) {
      alert("サーバにアクセスできません");
      console.error(e);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>ユーザー検索</h2>
      <div style={{ marginBottom: 10 }}>
        <label>ID: </label>
        <input value={id} onChange={(e) => setId(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Name: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Email: </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button onClick={handleSearch}>検索</button>

      <hr />

      <h3>検索結果</h3>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Password</th>
          </tr>
        </thead>

        <tbody>
          {result.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}