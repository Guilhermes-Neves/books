<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <h1>Meus Livros</h1>
      </v-row>
      <v-row>
        <!-- Filtros e Botão Buscar -->
        <v-col cols="3">
          <v-text-field data-cy="searchTitulo" label="Título" v-model="filters.titulo" outlined dense></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field data-cy="searchAutor" label="Autor" v-model="filters.autor" outlined dense></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select :items="['Lido', 'Lendo', 'Não iniciado']" data-cy="searchStatus" label="Status" v-model="filters.status" outlined
            dense></v-select>
        </v-col>
        <v-col cols="3" class="d-flex align-right">
          <v-btn @click="applyFilters" id="searchLivro" color="primary" outlined>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              id="clearFiltros"
              @click="clearFilters"
              class="ml-2 red-border red-text"
            >
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </template>
          <span>Limpa todos os filtros aplicados</span>
        </v-tooltip>
          <!-- <v-btn @click="clearFilters" outlined class="ml-2 red-border red-text">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn> -->
          <v-btn color="primary" id="btnNewBook" @click="openModal" class="ml-2">Novo Livro</v-btn>
        </v-col>
      </v-row>

      <!-- Tabela de Livros -->
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="books" item-key="id" class="elevation-1" header-class="text-center"
            :loading="loading">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.titulo || 'N/A' }}</td>
                <td>{{ item.autor || 'N/A' }}</td>
                <td>{{ item.editora || 'N/A' }}</td>
                <td>{{ item.anoPublicacao || 'N/A' }}</td>
                <td>{{ item.numeroPaginas || 'N/A' }}</td>
                <td>{{ item.status || 'N/A' }}</td>
                <td>
                  <v-btn color="primary" name="editBook" @click="editBook(item)"
                    class="ml-2"><v-icon>mdi-pencil</v-icon></v-btn>
                  <v-btn color="red" name="deleteBook" @click="confirmDelete(item)"
                    class="white--text ml-2"><v-icon>mdi-delete</v-icon></v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!-- Snackbar for error messages -->
      <v-snackbar v-model="showError" color="error" :timeout="3000" top>
        {{ errorMessage }}
        <!-- //<v-btn color="white" text @click="showError = false">Close</v-btn> -->
      </v-snackbar>

      <!-- Modal para Cadastrar/Editar Livros -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ editMode ? 'Editar Livro' : 'Novo Livro' }}</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field v-model="bookForm.titulo" id="bookTitulo" label="Título" required></v-text-field>
              <v-text-field v-model="bookForm.autor" id="bookAutor" label="Autor" required></v-text-field>
              <v-text-field v-model="bookForm.editora" id="bookEditora" label="Editora" required></v-text-field>
              <v-text-field v-model.number="bookForm.anoPublicacao" id="bookAnoPublicacao" label="Ano de Publicação"
                type="number" required></v-text-field>
              <v-text-field v-model.number="bookForm.numeroPaginas" id="bookNumPag" label="Número de Páginas"
                type="number" required></v-text-field>
              <v-select v-model="bookForm.status" :items="statuses" id="bookStatus" label="Status" required></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" id="btnCloseModal" text @click="closeModal">Cancelar</v-btn>
            <v-btn color="blue darken-1" id="submitForm" text @click="createBook" :disabled="!valid">{{ editMode ?
              'Salvar' :
              'Criar'
              }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Modal de Confirmação de Exclusão -->
      <v-dialog v-model="confirmDeleteDialog" max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">Confirmar Exclusão</span>
          </v-card-title>
          <v-card-text>
            Tem certeza de que deseja excluir este livro?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" id="btnCancelDelete" text @click="cancelDelete">Cancelar</v-btn>
            <v-btn color="red darken-1" id="btnDeleteConfirm" text @click="deleteBookConfirm">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Snackbar de Sucesso -->
      <v-snackbar id="toastMessage" v-model="snackbar" :timeout="timeout" :color="snackbarColor" top>
        {{ snackbarMessage }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialog: false,
      confirmDeleteDialog: false,
      valid: false,
      editMode: false,
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: '',
      timeout: 3000,  // Duração do snackbar
      bookForm: {
        id: null,
        titulo: '',
        autor: '',
        editora: '',
        anoPublicacao: null,
        numeroPaginas: null,
        status: ''
      },
      filters: {
        titulo: '',
        autor: '',
        status: ''
      },
      statuses: ['Lido', 'Lendo', 'Não iniciado'],
      headers: [
        { text: 'Título', value: 'titulo' },
        { text: 'Autor', value: 'autor' },
        { text: 'Editora', value: 'editora' },
        { text: 'Ano de Publicação', value: 'anoPublicacao' },
        { text: 'Número de Páginas', value: 'numeroPaginas' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      books: [],
      loading: false,
      bookToDelete: null,
      showError: false,
      errorMessage: '',
      response: null,
      duplicateMessage: 'Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.livros index: titulo_1_autor_1_editora_1_anoPublicacao_1_numPaginas_1 dup key: { titulo: "Criado via API", autor: "Guilherme", editora: "Editora 1", anoPublicacao: 2010, numPaginas: null }'
    };
  },
  methods: {
    handleError(error, msg) {
      this.errorMessage = error.response.message || msg;
      this.showError = true;
      console.error(error); // Still log to console for debugging
    },
    async fetchBooks() {
      this.loading = true;
      try {
        this.response = await axios.get('http://localhost:5001/api/livros');
        this.books = this.response.data;
      } catch (error) {
        console.log(error)
        this.handleError(error, error.response.message || 'Ocorreu um erro!');
      } finally {
        this.loading = false;
      }
    },
    async searchBooks() {
      this.loading = true;
      try {
        this.response = await axios.get(`http://localhost:5001/api/livros/search?titulo=${this.filters.titulo}&autor=${this.filters.autor}&status=${this.filters.status}`);
        this.books = this.response.data;
      } catch (error) {
        this.handleError(error, error.data.message || 'Ocorreu um erro!');
      } finally {
        this.loading = false;
        this.response = null
      }
    },
    clearFilters() {
      // Clear all the filters
      this.filters.titulo = '';
      this.filters.autor = '';
      this.filters.status = '';
      this.fetchBooks(); // Fetch all books without filters
    },
    openModal() {
      this.editMode = false;
      this.bookForm = {
        id: null,
        titulo: '',
        autor: '',
        editora: '',
        anoPublicacao: '',
        numeroPaginas: '',
        status: ''
      };
      this.dialog = true;
    },
    editBook(book) {
      try {
        this.editMode = true;
        this.bookForm = { ...book };
        this.dialog = true;
      } catch (error) {
        this.snackbarMessage = 'Ocorreu um erro!';
        this.snackbarColor = 'red';
        this.snackbar = true;
      }
    },
    async createBook() {
      if (this.$refs.form.validate()) {
        try {
          // Converter valores para inteiros
          this.bookForm.anoPublicacao = parseInt(this.bookForm.anoPublicacao, 10);
          this.bookForm.numeroPaginas = parseInt(this.bookForm.numeroPaginas, 10);

          //let response
          if (this.editMode) {
            // Editar livro
            this.response = await axios.put(`http://localhost:5001/api/livros/${this.bookForm._id}`, this.bookForm);
            this.snackbarMessage = this.response.data.message;
          } else {
            this.response = await axios.post('http://localhost:5001/api/livros', this.bookForm);
            this.snackbarMessage = this.response.data.message;
          }
          console.log(this.response)

          this.snackbarColor = 'green';
          this.snackbar = true;
          this.closeModal();
          this.fetchBooks();
        } catch (error) {
          console.log(error)
          this.snackbarMessage = error.response.data.message
          this.snackbarColor = 'red';
          this.snackbar = true;
        }
      }
    },
    confirmDelete(book) {
      this.bookToDelete = book;
      this.confirmDeleteDialog = true;
    },
    async deleteBookConfirm() {
      if (this.bookToDelete && this.bookToDelete._id) {
        try {
          this.response = await axios.delete(`http://localhost:5001/api/livros/${this.bookToDelete._id}`);
          this.snackbarMessage = this.response.data.message;
          this.snackbarColor = 'green';
          this.snackbar = true;
          this.fetchBooks();
          this.cancelDelete();
        } catch (error) {
          this.handleError(error, error.message || 'Ocorreu um erro!');
        }
      } else {
        console.error('Livro não tem ID definido:', this.bookToDelete);
      }
      this.response = null
    },
    cancelDelete() {
      this.confirmDeleteDialog = false;
      this.bookToDelete = null;
    },
    closeModal() {
      this.dialog = false;
    },
    applyFilters() {
      // Garantir que filtros não sejam undefined
      this.filters.titulo = this.filters.titulo || '';
      this.filters.autor = this.filters.autor || '';
      this.filters.status = this.filters.status || '';

      this.searchBooks();
    }
  },
  created() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
h1 {
  padding-bottom: 20px;
  padding-left: 12px;
}

.headline {
  font-weight: bold;
}

.text-center {
  text-align: center;
}

td {
  text-align: left;
}

.red-border {
  border: 2px solid red !important;
}

.red-text {
  color: red !important;
}

/* Exemplo de CSS para evitar overflow em telas menores */
.table-wrapper {
  overflow-x: auto;
}

.v-btn {
  white-space: nowrap;
  /* Evitar quebra de linha nos botões */
}

.v-text-field input {
  box-sizing: border-box;
  /* Garantir que inputs não ultrapassem seu contêiner */
}
</style>
