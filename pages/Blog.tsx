import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: 'Nexloom v1.0 リリースのお知らせ',
      excerpt: '数ヶ月のベータテストを経て、ついにNexloomの正式版をリリースしました。主な新機能と今後のロードマップについてご紹介します。',
      date: '2023.10.15',
      author: 'Nexloom Team',
      category: 'Release',
      image: 'https://picsum.photos/800/400?random=1'
    },
    {
      id: 2,
      title: 'リモートワークでの効果的なコラボレーション術',
      excerpt: 'テキストチャットとビデオ会議をどのように使い分けるべきか？Nexloomを使った非同期コミュニケーションのベストプラクティス。',
      date: '2023.10.20',
      author: 'Taro Yamada',
      category: 'Tips',
      image: 'https://picsum.photos/800/400?random=2'
    },
    {
      id: 3,
      title: 'Google Gemini APIを活用した議事録作成の裏側',
      excerpt: 'NexloomのAI会議録音機能はどのように実装されているのか？Gemini APIの活用事例と技術的な知見をエンジニアが解説します。',
      date: '2023.10.28',
      author: 'Kenji Sato',
      category: 'Engineering',
      image: 'https://picsum.photos/800/400?random=3'
    },
    {
      id: 4,
      title: 'ドキュメント管理を効率化するMarkdownテクニック',
      excerpt: '見出し、リスト、テーブルだけじゃない。Mermaid図やカスタムブロックを使って、読みやすく美しいドキュメントを作成する方法。',
      date: '2023.11.05',
      author: 'Hanako Suzuki',
      category: 'Guide',
      image: 'https://picsum.photos/800/400?random=4'
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Nexloom ブログ</h1>
          <p className="text-lg text-slate-600">
            製品のアップデート、開発の裏側、チームワークのヒントをお届けします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="h-48 overflow-hidden bg-slate-200">
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
                  <a href="#">{post.title}</a>
                </h2>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                      <User size={14} />
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center">
                    Read more <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
            以前の記事を読み込む
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;