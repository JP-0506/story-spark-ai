"""
score_api.py
------------
Flask blueprint exposing POST /score.
Called by ai_model.service.ts after Gemini generates stories.

Place at: backend/ml/score_api.py
"""

from flask import Blueprint, request, jsonify
from scorer import score as score_story

score_bp = Blueprint("score", __name__)


@score_bp.route("/score", methods=["POST"])
def score_route():
    """
    Request body:
        {
          "stories": [
            { "title": "...", "content": "...", "uuid": "..." },
            ...
          ],
          "prompt": "the original user prompt"
        }

    Response:
        {
          "scores": [
            {
              "uuid": "...",
              "coherence": 0.82,
              "creativity": 0.74,
              "relevance": 0.91,
              "overall": 0.82
            },
            ...
          ]
        }
    """
    data = request.get_json(force=True)

    if not data or "stories" not in data or "prompt" not in data:
        return jsonify({"error": "Missing stories or prompt"}), 400

    prompt  = data["prompt"]
    stories = data["stories"]
    results = []

    for story in stories:
        try:
            scores = score_story(story.get("content", ""), prompt)
            results.append({"uuid": story.get("uuid", ""), **scores})
        except FileNotFoundError as e:
            return jsonify({"error": str(e)}), 503
        except Exception as e:
            results.append({"uuid": story.get("uuid", ""), "error": str(e)})

    return jsonify({"scores": results})