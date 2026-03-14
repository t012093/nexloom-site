import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import {
  Apple,
  ArrowRight,
  BellRing,
  Globe,
  MessageSquareText,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
} from 'lucide-react';
import Button from '../components/Button';
import { IOS_TESTFLIGHT_APP_URL, IOS_TESTFLIGHT_URL, WEB_APP_URL } from '../constants/links';

const MobilePage: React.FC = () => {
  const hasTestFlightInvite = Boolean(IOS_TESTFLIGHT_URL);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.14),_transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#eef2ff_100%)] overflow-hidden">
      <section className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[72rem] h-[72rem] bg-indigo-200/20 blur-[140px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm mb-8">
                  <Smartphone size={16} />
                  <span>Mobile Beta</span>
                  <span className="text-slate-400">iOS先行 / Android preview</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05] mb-8">
                  机の前だけで終わらない、
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-sky-500">
                    チームのモバイル拠点。
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mb-10">
                  Nexloomのモバイル版は、通知確認のための軽い companion ではなく、
                  チャット、プロジェクト、AI、個人の作業導線を持ち歩くための本体として設計しています。
                  現在は Web 版がいちばん早く使え、モバイル版は配布状況に応じて順次導入できます。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a href={WEB_APP_URL} className="w-full sm:w-auto" aria-label="Nexloom Webアプリを開く">
                    <Button size="lg" className="w-full sm:w-auto h-15 px-10 rounded-2xl text-base shadow-xl shadow-indigo-200">
                      Webアプリを開く
                    </Button>
                  </a>
                  <Link to="/download" className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto h-15 px-10 rounded-2xl text-base border-2 border-slate-200 bg-white/80"
                    >
                      デスクトップ版を見る
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-500">
                  <span className="px-4 py-2 rounded-full bg-white/80 border border-slate-200">iOS先行運用</span>
                  <span className="px-4 py-2 rounded-full bg-white/80 border border-slate-200">プッシュ通知対応</span>
                  <span className="px-4 py-2 rounded-full bg-white/80 border border-slate-200">外出先のAI導線</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-indigo-300/40 to-sky-200/30 blur-3xl scale-105" />
                <div className="relative rounded-[3rem] border border-white/50 bg-slate-950 p-3 shadow-[0_45px_120px_-24px_rgba(15,23,42,0.55)]">
                  <div className="rounded-[2.5rem] bg-[linear-gradient(180deg,#0f172a_0%,#111827_32%,#f8fafc_32.1%,#ffffff_100%)] overflow-hidden">
                    <div className="h-8 flex justify-center items-center">
                      <div className="w-24 h-1.5 rounded-full bg-white/20" />
                    </div>
                    <div className="px-5 pt-5 pb-7 space-y-5">
                      <div className="rounded-3xl bg-indigo-600 text-white p-5 shadow-xl shadow-indigo-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-white/70 font-bold">Focus</p>
                            <p className="text-2xl font-black">Today</p>
                          </div>
                          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur">
                            <Sparkles size={20} />
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-indigo-50">
                          会議要約からそのまま次のタスクへ。出先でもチームの流れを切らさない。
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <BellRing className="text-indigo-600 mb-3" size={18} />
                          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Alerts</p>
                          <p className="text-sm font-bold text-slate-900">通知を整理して要点だけ返す</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <MessageSquareText className="text-violet-600 mb-3" size={18} />
                          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">Chat</p>
                          <p className="text-sm font-bold text-slate-900">会話の続きにすぐ戻れる</p>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">AI Assist</p>
                            <p className="text-lg font-black text-slate-900">移動中の判断を軽くする</p>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                            Live
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-2.5 rounded-full bg-slate-100 w-full" />
                          <div className="h-2.5 rounded-full bg-slate-100 w-5/6" />
                          <div className="h-2.5 rounded-full bg-slate-100 w-2/3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div className="bg-white/90 backdrop-blur rounded-[2rem] border border-slate-200 p-8 shadow-[0_25px_60px_-20px_rgba(15,23,42,0.18)]">
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-600 font-black mb-4">Availability</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                本番の見せ方を整えながら、
                <br />
                着実に広げる段階です。
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                モバイルは iOS 先行で体験を磨き、Android は接続安定性と通知導線を優先して仕上げています。
                先に Web とデスクトップで使い始めても、後から同じチーム文脈をそのまま持ち込めます。
              </p>
              <div className="space-y-4">
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Apple className="text-indigo-600" size={20} />
                      <span className="font-black text-slate-900">iOS Beta</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">Early access</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    まずは iPhone でのチャット、通知、AI 導線を先行最適化しています。
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Play className="text-slate-700" size={20} />
                      <span className="font-black text-slate-900">Android Preview</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">In progress</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Android は互換性確認と接続設定 UX を詰めながら、段階的に広げます。
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5">
                  <BellRing size={22} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">通知で終わらせない</h3>
                <p className="text-slate-600 leading-relaxed">
                  見逃し確認だけではなく、会議の続き、チャットの流れ、次の行動までそのまま引き継げる導線を作ります。
                </p>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mb-5">
                  <Wifi size={22} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">移動中の接続にも強い</h3>
                <p className="text-slate-600 leading-relaxed">
                  モバイル特有の接続変動を前提に、API 切替や再接続の体験を安定化しています。
                </p>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
                  <MessageSquareText size={22} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">チャットを持ち歩く</h3>
                <p className="text-slate-600 leading-relaxed">
                  チャンネル、DM、AI 支援をスマホでつなぎ、あとでデスクトップに戻っても文脈が途切れません。
                </p>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">認証と権限は同じ基盤</h3>
                <p className="text-slate-600 leading-relaxed">
                  Web と同じアカウント基盤を前提に、チームの認証・通知・権限モデルを統一します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mobile-download" className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-600 font-black mb-4">How To Start</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-5">
              モバイル版の導入方法
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              現時点では Web 版が最短の利用開始手段です。モバイルは iOS を先行配布し、Android は preview を段階展開しています。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-[2rem] border border-indigo-100 bg-white p-7 shadow-[0_20px_50px_-20px_rgba(79,70,229,0.2)]">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5">
                <Globe size={22} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-3">Recommended</p>
              <h3 className="text-2xl font-black text-slate-900 mb-4">まずは Web 版</h3>
              <ol className="space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
                <li>Web アプリを開いてサインインする</li>
                <li>組織を選び、最初のプロジェクトを1つ作る</li>
                <li>そのままモバイル配布案内を待つ</li>
              </ol>
              <div className="mt-6">
                <a href={WEB_APP_URL} className="inline-flex">
                  <Button size="lg" className="rounded-2xl px-6">
                    Web アプリを開く
                  </Button>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mb-5">
                <Apple size={22} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">iOS Beta</p>
              <h3 className="text-2xl font-black text-slate-900 mb-4">TestFlight で導入</h3>
              <ol className="space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
                <li>配布案内を受け取る</li>
                <li>App Store で TestFlight を入れる</li>
                <li>招待リンクから Nexloom beta をインストールする</li>
                <li>Web 版と同じアカウントでログインする</li>
              </ol>
              <div className="mt-6 space-y-3">
                <a href={IOS_TESTFLIGHT_APP_URL} className="inline-flex w-full">
                  <Button variant="secondary" size="lg" className="w-full rounded-2xl justify-center">
                    TestFlight を入れる
                  </Button>
                </a>
                {hasTestFlightInvite ? (
                  <a href={IOS_TESTFLIGHT_URL} className="inline-flex w-full">
                    <Button size="lg" className="w-full rounded-2xl justify-center">
                      Nexloom beta を開く
                    </Button>
                  </a>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-500">
                    招待リンクを設定すると、ここに直接導入ボタンを表示します。
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mb-5">
                <Play size={22} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Android Preview</p>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Internal Build で導入</h3>
              <ol className="space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
                <li>配布された Android ビルドを取得する</li>
                <li>必要な場合のみ提供元不明アプリの許可を有効にする</li>
                <li>APK をインストールしてログインする</li>
                <li>互換性差分がある場合は案内ドキュメントに従う</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
            <p className="font-black mb-2">現在の公開状況</p>
            <p className="leading-relaxed">
              公開ストア URL が未整備の期間は、Web 版を正規の入口として案内し、モバイル版は TestFlight または internal build で提供します。
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">
            <div className="rounded-[2rem] border border-indigo-100 bg-[linear-gradient(145deg,#0f172a_0%,#1e1b4b_58%,#4338ca_100%)] p-7 text-white shadow-[0_32px_80px_-42px_rgba(15,23,42,0.72)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200 mb-4">iOS Install</p>
              <h3 className="text-3xl font-black tracking-tight mb-4">
                TestFlight 導線を、
                <br />
                このページで完結させる。
              </h3>
              <p className="text-sm leading-7 text-indigo-100/85 mb-6">
                iPhone からはそのままリンクを開き、PC からは QR を読み取って導入できます。
                招待 URL を設定すると、Nexloom beta のインストール入口としてそのまま機能します。
              </p>
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                  1. 先に TestFlight アプリを入れる
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                  2. 招待リンクまたは QR から Nexloom beta を開く
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                  3. Web と同じアカウントでサインインする
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href={IOS_TESTFLIGHT_APP_URL} className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full rounded-2xl bg-white text-slate-900 border-white sm:w-auto"
                  >
                    TestFlight App
                  </Button>
                </a>
                {hasTestFlightInvite ? (
                  <a href={IOS_TESTFLIGHT_URL} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full rounded-2xl sm:w-auto">
                      招待リンクを開く
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.24)]">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">QR Install</p>
                  <h3 className="text-2xl font-black text-slate-900">iPhone で読み取る</h3>
                </div>
                <div className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] bg-slate-100 text-slate-600">
                  {hasTestFlightInvite ? 'Ready' : 'Pending'}
                </div>
              </div>

              {hasTestFlightInvite ? (
                <>
                  <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 flex items-center justify-center">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <QRCode value={IOS_TESTFLIGHT_URL} size={192} />
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    PC でこのページを開き、iPhone のカメラで QR を読み取ると TestFlight 招待リンクを直接開けます。
                  </p>
                  <a href={IOS_TESTFLIGHT_URL} className="mt-5 inline-flex w-full">
                    <Button size="lg" className="w-full rounded-2xl justify-center">
                      iPhone で TestFlight 招待を開く
                    </Button>
                  </a>
                </>
              ) : (
                <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <div className="mx-auto mb-4 h-40 w-40 rounded-[2rem] border border-slate-200 bg-white/80" />
                  <p className="text-sm font-semibold text-slate-700">招待 URL を設定すると QR をここに表示します。</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    `VITE_IOS_TESTFLIGHT_URL` に TestFlight 招待リンクを入れると、
                    このページにダウンロード導線と QR が自動で出ます。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.75rem] bg-slate-950 text-white p-10 md:p-14 relative overflow-hidden shadow-[0_40px_120px_-36px_rgba(15,23,42,0.7)]">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-indigo-500/20 to-transparent" />
            <div className="relative z-10 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-300 font-black mb-4">Next</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5">
                モバイルでも、
                <br />
                Nexloom の文脈をそのまま。
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                まずは Web とデスクトップでチーム基盤を作り、モバイル版で通知・会話・AI の即応性を足す構成が最もスムーズです。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={WEB_APP_URL} className="w-full sm:w-auto" aria-label="Nexloom Webアプリを開く">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white text-slate-900 border-white">
                    Webで今すぐ始める
                  </Button>
                </a>
                <Link to="/download" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto h-14 px-8 rounded-2xl border border-white/20 text-white hover:bg-white/10">
                    デスクトップ版を見る
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobilePage;
