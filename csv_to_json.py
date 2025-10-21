import pandas as pd
import json
import hashlib

def csv_to_glossary_json(csv_path):
    try:
        df = pd.read_csv(csv_path, encoding='utf-8')
    except UnicodeDecodeError:
        df = pd.read_csv(csv_path, encoding='cp949') # Windows 기본 인코딩 시도

    glossary_terms = []
    for index, row in df.iterrows():
        # CSV 파일의 실제 열 이름에 맞게 수정합니다.
        term_name = str(row.get('Term', f'Unknown Term {index}'))
        definition = str(row.get('Definition', 'No definition provided.'))
        category = str(row.get('Category', '기타'))

        # 'Example'과 'Analogy' 열은 CSV 파일에 없으므로 빈 문자열로 설정합니다.
        example = ''
        analogy = ''

        # 고유 ID 생성 (용어와 정의를 기반으로 해시)
        term_id = hashlib.md5(f"{term_name}-{definition}".encode()).hexdigest()

        glossary_term = {
            "id": term_id,
            "term": term_name,
            "definition": definition,
            "example": example,
            "analogy": analogy,
            "relatedTerms": [],
            "isFavorite": False,
            "category": category,
        }
        glossary_terms.append(glossary_term)
    return glossary_terms

if __name__ == "__main__":
    csv_file_path = "C:\\Users\\Windows 10\\Desktop\\IT_Terminology_Glossary.CSV"
    glossary_data = csv_to_glossary_json(csv_file_path)
    print(json.dumps(glossary_data, ensure_ascii=False, indent=2))
