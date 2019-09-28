import Link from "next/link";

interface Menu {
  name: string;
  desc?: string[];
}

const menus: Menu[] = [
  { name: "表单", desc: ["即刻提交记录", "localStorage 版", "Sync 按钮"] },
  { name: "我要记东西" },
  {
    name: "我用过的记东西工具",
    desc: [
      "OneNote",
      "SimpleNote",
      "iCloud 备忘录",
      "maiku",
      "Youdao云笔记",
      "WizNote"
    ]
  },
  { name: "我要创建博客" },
  {
    name: "我使用过的博客工具",
    desc: [
      "textpattern",
      "wordpress",
      "flatblog",
      "drupal",
      "typecho",
      "ghost-blog",
      "vuepress",
      "gatsby",
      "next.js"
    ]
  },
  { name: "我创建过的博客", desc: ["www.songlairui.cn"] }
];

export default () => (
  <div>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
    <h1>Zero Page</h1>
    <h2>页面初始</h2>
    <ul>
      {menus.map((menu, idx) => (
        <li key={idx}>
          <dt key={idx}>{menu.name}</dt>
          {menu.desc && menu.desc.length ? (
            <ul>
              {menu.desc.map((line, subIdx) => (
                <li key={subIdx}>{line}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
    <pre>枚举目的：证明一味的认为自己需要个好工具，是个错觉。</pre>
  </div>
);
