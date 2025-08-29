# Battle-Factory

## 1. プロジェクト概要

ポケットモンスターのエメラルドに登場するバトルファクトリーの攻略サイト。
レンタルできるポケモンの情報、対戦相手のトレーナーが出してくるポケモンの情報などを網羅し、プレイヤーがより高い連勝記録を達成するのをサポートする。

## 2. 目的

- バトルファクトリーの攻略情報を集約し、プレイヤーに提供する。
- プレイヤー同士の情報交換の場を提供する。

## 3. ターゲットユーザー

- ポケットモンスターエメラルドのバトルファトリーで高い連勝記録を目指すすべてのプレイヤー

## 4. 主な機能

- **ポケモン図鑑**: レンタル可能な全ポケモンの詳細情報（種族値、覚えている技、性格、持ち物など）を検索・閲覧できる。
- **トレーナー情報**: 対戦相手のトレーナーが出してくるポケモンの組み合わせを検索・閲覧できる。
- **戦略シミュレーター**: ポケモンの組み合わせを入力し、有利不利などをシミュレーションできる機能を設ける。
- **掲示板**: プレイヤー同士が情報交換や質問を行えるコミュニティ機能。

## 5. 技術スタック

- **フロントエンド**: Next.js (TypeScript)
- **バックエンド**: Next.js (API Routes)
- **データベース**: Vercel Postgres
- **ホスティング**: Vercel
- **アセット管理**: ソースコードに同梱（暫定）

## 6. デザイン

- シンプルで分かりやすいUI/UXを心がける。
- レスポンシブデザインに対応し、スマートフォンでも快適に閲覧できるようにする。

## 7. データベース設計

アプリケーションで利用する主要なテーブルは以下の9つを想定する。

### 1. `pokemons` - ポケモンマスター
ポケモンの種族としての基本情報を格納する。
| カラム名 | 型 | 説明 |
|:---|:---|:---|
| `id` | `SERIAL` | 主キー |
| `pokedex_number` | `INTEGER` | 全国図鑑No. |
| `name` | `VARCHAR(255)` | ポケモン名（フォルム名含む） |
| `h` | `INTEGER` | 種族値: HP |
| `a` | `INTEGER` | 種族値: こうげき |
| `b` | `INTEGER` | 種族値: ぼうぎょ |
| `c` | `INTEGER` | 種族値: とくこう |
| `d` | `INTEGER` | 種族値: とくぼう |
| `s` | `INTEGER` | 種族値: すばやさ |
| `type1_id` | `INTEGER` | タイプ1 (types.idへのFK) |
| `type2_id` | `INTEGER` | タイプ2 (types.idへのFK) |
| `gender_ratio_id` | `INTEGER` | 性別比率ID (gender_ratios.idへのFK) |

### 2. `types` - タイプマスター
ポケモンのタイプを格納する。
| カラム名 | 型 | 説明 |
|:---|:---|:---|
| `id` | `SERIAL` | 主キー |
| `name` | `VARCHAR(255)` | タイプ名 (例: ほのお, みず) |

### 3. `gender_ratios` - 性別比率マスター
性別のパターンを格納する。
| カラム名 | 型 | 説明 |
|:---|:---|:---|
| `id` | `SERIAL` | 主キー |
| `name` | `VARCHAR(255)` | パターン名 (例: 基本, オスのみ) |
| `male_ratio` | `DECIMAL` | オスの比率 |
| `female_ratio` | `DECIMAL` | メスの比率 |
| `genderless_ratio` | `DECIMAL` | 性別不明の比率 (フラグとして利用) |

### 4. `type_chart` - タイプ相性表
タイプ間の相性関係を格納する。
| カラム名 | 型 | 説明 |
|:---|:---|:---|
| `id` | `SERIAL` | 主キー |
| `attacking_type_id` | `INTEGER` | 攻撃側タイプのID (types.idへのFK) |
| `defending_type_id` | `INTEGER` | 防御側タイプのID (types.idへのFK) |
| `multiplier` | `DECIMAL` | 相性倍率 (例: 2, 0.5, 0) |

### 5. `moves` - 技マスター
技の情報を格納する。
| カラム名 | 型 | 説明 |
|:---|:---|:---|
| `id` | `SERIAL` | 主キー |
| `name` | `VARCHAR(255)` | 技名 |
| `type_id` | `INTEGER` | 技のタイプ (types.idへのFK) |
| `power` | `INTEGER` | 威力 |
| `accuracy` | `INTEGER` | 命中率 |
| `pp` | `INTEGER` | PP |
| `category` | `VARCHAR(50)` | 分類（物理/特殊/変化） |

### 6. `items` - 持ち物マスター
持ち物の情報を格納する。
| カラム名 | 型 | 説明 |
|:---|:---|:---|
| `id` | `SERIAL` | 主キー |
| `name` | `VARCHAR(255)` | 持ち物名 |
| `description` | `TEXT` | 持ち物の効果 |

### 7. `natures` - 性格マスター
性格の情報を格納する。
| カラム名 | 型 | 説明 |
|:---|:---|:---|
| `id` | `SERIAL` | 主キー |
| `name` | `VARCHAR(255)` | 性格名 (例: いじっぱり) |
| `increased_stat` | `VARCHAR(50)` | 上昇する能力値 |
| `decreased_stat` | `VARCHAR(50)` | 下降する能力値 |

### 8. `pt_rental_sets` - レンタル個体 (プラチナ)
プラチナで実際にレンタルできるポケモンの個体情報を格納する。
| カラム名 | 型 | 説明 |
|:---|:---|:---|
| `id` | `SERIAL` | 主キー |
| `pokemon_id` | `INTEGER` | ポケモンID (pokemons.idへのFK) |
| `nature_id` | `INTEGER` | 性格ID (natures.idへのFK) |
| `item_id` | `INTEGER` | 持ち物ID (items.idへのFK) |
| `effort_values` | `JSONB` | 努力値 |

### 9. `pt_rental_set_moves` - レンタル個体の技 (プラチナ)
レンタル個体と技を関連付ける中間テーブル。
| カラム名 | 型 | 説明 |
|:---|:---|:---|
| `id` | `SERIAL` | 主キー |
| `rental_set_id` | `INTEGER` | レンタル個体ID (pt_rental_sets.idへのFK) |
| `move_id` | `INTEGER` | 技ID (moves.idへのFK) |


参考にした記事
https://yakkun.com/dp/zukan/list.htm
