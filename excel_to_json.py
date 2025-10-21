import pandas as pd
import json
import hashlib

def excel_to_glossary_json(excel_path):
    df = pd.read_excel(excel_path)
    glossary_terms = []
    for index, row in df.iterrows():
        # 엑셀 파일의 실제 열 이름에 따라 'Term', 'Definition' 등을 수정해야 합니다.
        # 여기서는 예시로 '용어', '정의', '예시', '유추', '카테고리'를 사용합니다.
        # 엑셀 파일에 해당 열이 없으면 None 또는 기본값으로 처리합니다.
        term_name = str(row.get('용어', f'Unknown Term {index}'))
        definition = str(row.get('정의', 'No definition provided.'))
        example = str(row.get('예시', ''))
        analogy = str(row.get('유추', ''))
        category = str(row.get('카테고리', '기타'))

        # 고유 ID 생성 (용어와 정의를 기반으로 해시)
        term_id = hashlib.md5(f"{term_name}-{definition}".encode()).hexdigest()

        glossary_term = {
            "id": term_id,
            "term": term_name,
            "definition": definition,
            "example": example if example != 'nan' else '', # pandas NaN 처리
            "analogy": analogy if analogy != 'nan' else '', # pandas NaN 처리
            "relatedTerms": [], # 엑셀 파일에 관련 용어 열이 없으므로 빈 배열로 설정
            "isFavorite": False,
            "category": category if category != 'nan' else '기타',
        }
        glossary_terms.append(glossary_term)
    return glossary_terms

if __name__ == "__main__":
    excel_file_path = "C:\\Users\\Windows 10\\Desktop\\IT_Terminology_Glossary.xlsx"
    glossary_data = excel_to_glossary_json(excel_file_path)
    print(json.dumps(glossary_data, ensure_ascii=False, indent=2))
