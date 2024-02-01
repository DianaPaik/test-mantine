"use client";
// use client 사용해야 함

import { useState, useRef } from "react";
import {
  PasswordInput,
  Anchor,
  Card,
  Text,
  Group,
  Button,
  Autocomplete,
  Loader,
  ButtonProps,
} from "@mantine/core";
import style from "./login.module.css";

export function LoginButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<"button">
) {
  return <Button variant="default" {...props} />;
}

export default function AutocompleteLoading() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 1000);
    }
  };
  return (
    <div className={style.container}>
      <img
        className={style["user-input"]}
        src="/CK_psxtg0605604.jpg"
        alt="Logo"
      />
      <Autocomplete
        className={style["user-input"]}
        value={value}
        data={data}
        onChange={handleChange}
        rightSection={loading ? <Loader size="1rem" /> : null}
        label="Email"
        placeholder="이메일 주소를 입력하세요."
      />
      <PasswordInput
        className={style["user-input"]}
        placeholder="비밀번호를 입력하세요."
        id="user-password"
        label="Password"
      />
      <LoginButton className={style["login-btn"]}>로그인</LoginButton>
    </div>
  );
}
