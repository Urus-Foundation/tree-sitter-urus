package tree_sitter_urus_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_urus "github.com/urus-foundation/tree-sitter-urus/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_urus.Language())
	if language == nil {
		t.Errorf("Error loading Urus grammar")
	}
}
